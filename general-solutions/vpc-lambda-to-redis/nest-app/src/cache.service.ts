import type { CachedResult } from '@buddy/cache';
import { CacheAdapter, ICacheService } from '@buddy/cache';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService implements ICacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(
        private readonly cacheAdapter: CacheAdapter,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    async get<T>(key: string): Promise<T | null> {
        try {
            const cacheKey = this.cacheAdapter.generateKey('simple', key);
            const result = await this.cacheManager.get<T | CachedResult<T>>(cacheKey);

            if (result === undefined || result === null) {
                return null;
            }

            if (this.isCachedResult(result)) {
                if (!result.success || result.data === null) {
                    await this.cacheAdapter.invalidate(cacheKey);
                    return null;
                }

                return result.data as T;
            }

            return result as T;
        } catch {
            return null;
        }
    }

    async set(key: string, value: unknown, ttl = 300): Promise<void> {
        try {
            const cacheKey = this.cacheAdapter.generateKey('simple', key);
            const ttlMs = ttl * 1000;

            await this.cacheManager.set(cacheKey, value, ttlMs);

            this.logger.debug(`Cache set: ${key} (TTL: ${ttl}s)`);
        } catch (error) {
            this.logger.warn(
                `Cache set failed for key "${key}": ${error instanceof Error ? error.message : String(error)}`
            );
            this.logger.debug(error instanceof Error ? error.stack : String(error));
        }
    }

    async del(key: string): Promise<void> {
        const cacheKey = this.cacheAdapter.generateKey('simple', key);
        await this.cacheAdapter.invalidate(cacheKey);
        this.logger.debug(`Cache deleted: ${key}`);
    }

    async delPattern(pattern: string): Promise<void> {
        // Delegate to CacheAdapter's implementation
        await this.cacheAdapter.delPattern(pattern);
        this.logger.debug(`Cache pattern deletion requested: ${pattern}`);
    }

    async clear(): Promise<void> {
        // Delegate to CacheAdapter's implementation
        await this.cacheAdapter.clear();
        this.logger.log('Cache cleared');
    }

    private isCachedResult<T>(value: T | CachedResult<T>): value is CachedResult<T> {
        return Boolean(
            value !== null &&
            typeof value === 'object' &&
            'success' in value &&
            typeof (value as unknown as Record<string, unknown>).success === 'boolean' &&
            ('data' in value || 'error' in value || 'valid' in value)
        );
    }
}
