import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
    InjectThrottlerOptions,
    InjectThrottlerStorage,
    ThrottlerGuard,
    type ThrottlerModuleOptions,
    type ThrottlerRequest,
    type ThrottlerStorage,
} from '@nestjs/throttler';

type FailedAttemptRecord = {
    blockedUntil: number;
    failedAt: number[];
};

type StringMap = { [prop: string]: string };

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    private readonly failedAttempts = new Map<string, FailedAttemptRecord>();

    constructor(
        @InjectThrottlerOptions() options: ThrottlerModuleOptions,
        @InjectThrottlerStorage() storageService: ThrottlerStorage,
        reflector: Reflector
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

        const record = this.getActiveRecord(key, now, ttlMs);

        if (record.blockedUntil > now) {
            const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
            res.header('Retry-After', retryAfterSeconds);

            await this.throwThrottlingException(context, {
                limit,
                ttl,
                key,
                tracker,
                totalHits: record.failedAt.length,
                timeToExpire: this.timeToExpire(record.failedAt, now, ttlMs),
                isBlocked: true,
                timeToBlockExpire: retryAfterSeconds,
            });
        }

        res.once('finish', () => {
            if (res.statusCode !== 401 && res.statusCode !== 403) {
                return;
            }

            const updatedRecord = this.getActiveRecord(key, Date.now(), ttlMs);
            updatedRecord.failedAt.push(Date.now());

            if (updatedRecord.failedAt.length >= limit) {
                updatedRecord.blockedUntil = Date.now() + blockDurationMs;
            }

            this.failedAttempts.set(key, updatedRecord);
        });

        return true;
    }

    private getActiveRecord(key: string, now: number, ttlMs: number): FailedAttemptRecord {
        const existingRecord = this.failedAttempts.get(key) ?? {
            blockedUntil: 0,
            failedAt: [],
        };
        const threshold = now - ttlMs;
        const activeFailures = existingRecord.failedAt.filter((timestamp) => timestamp > threshold);
        const blockedUntil = existingRecord.blockedUntil > now ? existingRecord.blockedUntil : 0;
        const activeRecord: FailedAttemptRecord = {
            blockedUntil,
            failedAt: activeFailures,
        };

        if (activeRecord.failedAt.length === 0 && activeRecord.blockedUntil === 0) {
            this.failedAttempts.delete(key);
            return activeRecord;
        }

        this.failedAttempts.set(key, activeRecord);

        return activeRecord;
    }

    private timeToExpire(failedAt: number[], now: number, ttlMs: number): number {
        if (failedAt.length === 0) {
            return 0;
        }

        const oldestFailure = Math.min(...failedAt);

        return Math.max(0, Math.ceil((oldestFailure + ttlMs - now) / 1000));
    }

    protected override getTracker(req: Record<string, string | StringMap>): Promise<string> {
        const forwardedFor = (req.headers as StringMap)?.['x-forwarded-for'] as string | undefined;
        const ip =
            (req.ip as string) ??
            forwardedFor?.split(',')[0]?.trim() ??
            (req.socket as { remoteAddress?: string })?.remoteAddress ??
            'unknown';

        const rawEmail = (req.body as StringMap)?.email ?? 'anonymous';
        const email = String(rawEmail).trim().toLowerCase();

        return Promise.resolve(`${ip}:${email}`);
    }
}
