import { CacheService } from '@/common/services/cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
    InjectThrottlerOptions,
    InjectThrottlerStorage,
    ThrottlerGuard,
    type ThrottlerModuleOptions,
    type ThrottlerRequest,
    type ThrottlerStorage,
} from '@nestjs/throttler';
import type { Cache } from 'cache-manager';
import { randomUUID } from 'node:crypto';

type FailedAttemptRecord = {
    blockedUntil: number;
    failedAt: number[];
    pendingAttempts: number;
};

type StringMap = { [prop: string]: string };

type RedisLikeClient = {
    set(key: string, value: string, options?: { NX?: boolean; PX?: number }): Promise<'OK' | null>;
    eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<number>;
};

type KeyvStoreLike = {
    store?: {
        getClient?: () => Promise<RedisLikeClient>;
    };
    getClient?: () => Promise<RedisLikeClient>;
};

type ReserveAttemptResult = {
    blocked: boolean;
    retryAfterSeconds: number;
    failedAt: number[];
};

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    private readonly cacheKeyPrefix = 'auth:login-failures';

    constructor(
        @InjectThrottlerOptions() options: ThrottlerModuleOptions,
        @InjectThrottlerStorage() storageService: ThrottlerStorage,
        reflector: Reflector,
        private readonly cacheService: CacheService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {
        super(options, storageService, reflector);
    }

    override async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
        const { context, limit, ttl, throttler, blockDuration, getTracker, generateKey } =
            requestProps;
        const { req, res } = this.getRequestResponse(context);
        const tracker = await getTracker(req, context);
        const key = generateKey(context, tracker, throttler.name ?? 'default');
        const now = Date.now();
        const ttlMs = ttl;
        const blockDurationMs = blockDuration;

        const reservation = await this.reserveAttempt(key, now, ttlMs, limit);

        if (reservation.blocked) {
            const { retryAfterSeconds } = reservation;
            res.header('Retry-After', retryAfterSeconds);

            await this.throwThrottlingException(context, {
                limit,
                ttl,
                key,
                tracker,
                totalHits: reservation.failedAt.length,
                timeToExpire: this.timeToExpire(reservation.failedAt, now, ttlMs),
                isBlocked: true,
                timeToBlockExpire: retryAfterSeconds,
            });
        }

        res.once('finish', () => {
            void this.finalizeAttempt(key, ttlMs, blockDurationMs, limit, res.statusCode);
        });

        return true;
    }

    private async reserveAttempt(
        key: string,
        now: number,
        ttlMs: number,
        limit: number
    ): Promise<ReserveAttemptResult> {
        return await this.withTrackerLock(key, async () => {
            const cacheKey = this.buildCacheKey(key);
            const record = await this.getActiveRecord(cacheKey, now, ttlMs);

            if (record.blockedUntil > now) {
                return {
                    blocked: true,
                    retryAfterSeconds: Math.ceil((record.blockedUntil - now) / 1000),
                    failedAt: record.failedAt,
                };
            }

            const attemptsInWindow = record.failedAt.length + record.pendingAttempts;
            if (attemptsInWindow >= limit) {
                const retryAfterSeconds = Math.max(
                    1,
                    this.timeToExpire(record.failedAt, now, ttlMs)
                );

                return {
                    blocked: true,
                    retryAfterSeconds,
                    failedAt: record.failedAt,
                };
            }

            record.pendingAttempts += 1;
            await this.persistRecord(cacheKey, record, ttlMs);

            return {
                blocked: false,
                retryAfterSeconds: 0,
                failedAt: record.failedAt,
            };
        });
    }

    private async getActiveRecord(
        cacheKey: string,
        now: number,
        ttlMs: number
    ): Promise<FailedAttemptRecord> {
        const existingRecord = (await this.cacheService.get<FailedAttemptRecord>(cacheKey)) ?? {
            blockedUntil: 0,
            failedAt: [],
            pendingAttempts: 0,
        };
        const existingFailedAt = Array.isArray(existingRecord.failedAt)
            ? existingRecord.failedAt
            : [];
        const existingBlockedUntil =
            typeof existingRecord.blockedUntil === 'number' ? existingRecord.blockedUntil : 0;
        const existingPendingAttempts =
            typeof existingRecord.pendingAttempts === 'number' &&
            Number.isFinite(existingRecord.pendingAttempts)
                ? Math.max(0, existingRecord.pendingAttempts)
                : 0;
        const threshold = now - ttlMs;
        const activeFailures = existingFailedAt.filter((timestamp) => timestamp > threshold);
        const blockedUntil = existingBlockedUntil > now ? existingBlockedUntil : 0;
        const activeRecord: FailedAttemptRecord = {
            blockedUntil,
            failedAt: activeFailures,
            pendingAttempts: existingPendingAttempts,
        };

        return activeRecord;
    }

    private async finalizeAttempt(
        key: string,
        ttlMs: number,
        blockDurationMs: number,
        limit: number,
        responseStatusCode: number
    ): Promise<void> {
        const now = Date.now();

        await this.withTrackerLock(key, async () => {
            const cacheKey = this.buildCacheKey(key);
            const updatedRecord = await this.getActiveRecord(cacheKey, now, ttlMs);

            updatedRecord.pendingAttempts = Math.max(0, updatedRecord.pendingAttempts - 1);

            if (responseStatusCode === 401 || responseStatusCode === 403) {
                updatedRecord.failedAt.push(now);

                if (updatedRecord.failedAt.length >= limit) {
                    updatedRecord.blockedUntil = now + blockDurationMs;
                }
            }

            if (
                updatedRecord.failedAt.length === 0 &&
                updatedRecord.pendingAttempts === 0 &&
                updatedRecord.blockedUntil <= now
            ) {
                await this.cacheService.del(cacheKey);
                return;
            }

            await this.persistRecord(cacheKey, updatedRecord, ttlMs);
        });
    }

    private async persistRecord(
        cacheKey: string,
        record: FailedAttemptRecord,
        ttlMs: number
    ): Promise<void> {
        const recordRetentionSeconds = Math.max(
            1,
            Math.ceil(
                Math.max(
                    ttlMs,
                    record.blockedUntil > 0 ? Math.max(0, record.blockedUntil - Date.now()) : 0
                ) / 1000
            )
        );
        await this.cacheService.set(cacheKey, record, recordRetentionSeconds);
    }

    private async withTrackerLock<T>(key: string, work: () => Promise<T>): Promise<T> {
        const client = await this.getRedisClient();
        if (!client) {
            return await work();
        }

        const lockKey = this.buildLockKey(key);
        const lockToken = randomUUID();
        const lockTtlMs = 1500;
        const maxAttempts = 40;

        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
            const acquired = await client.set(lockKey, lockToken, {
                NX: true,
                PX: lockTtlMs,
            });

            if (acquired === 'OK') {
                try {
                    return await work();
                } finally {
                    await this.releaseRedisLock(client, lockKey, lockToken);
                }
            }

            await new Promise<void>((resolve) => {
                setTimeout(resolve, 20);
            });
        }

        return await work();
    }

    private async getRedisClient(): Promise<RedisLikeClient | null> {
        const { stores } = this.cacheManager as { stores?: KeyvStoreLike[] };

        for (const store of stores ?? []) {
            const redisAdapter = store?.store ?? store;
            if (typeof redisAdapter?.getClient === 'function') {
                return await redisAdapter.getClient();
            }
        }

        return null;
    }

    private async releaseRedisLock(
        client: RedisLikeClient,
        lockKey: string,
        lockToken: string
    ): Promise<void> {
        const releaseScript = `
if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
end
return 0
`;

        await client.eval(releaseScript, {
            keys: [lockKey],
            arguments: [lockToken],
        });
    }

    private buildCacheKey(key: string): string {
        return `${this.cacheKeyPrefix}:${key}`;
    }

    private buildLockKey(key: string): string {
        return `${this.cacheKeyPrefix}:lock:${key}`;
    }

    private timeToExpire(failedAt: number[], now: number, ttlMs: number): number {
        if (failedAt.length === 0) {
            return 0;
        }

        const oldestFailure = Math.min(...failedAt);

        return Math.max(0, Math.ceil((oldestFailure + ttlMs - now) / 1000));
    }

    protected override getTracker(req: Record<string, string | StringMap>): Promise<string> {
        const forwardedFor = (req.headers as StringMap)?.['x-forwarded-for'];
        const ip =
            (req.ip as string) ??
            forwardedFor?.split(',')[0]?.trim() ??
            (req.socket as { remoteAddress?: string })?.remoteAddress ??
            'unknown';

        const rawEmail = (req.body as StringMap | undefined)?.email ?? 'anonymous';
        const email = String(rawEmail).trim().toLowerCase();

        return Promise.resolve(`${ip}:${email}`);
    }
}
