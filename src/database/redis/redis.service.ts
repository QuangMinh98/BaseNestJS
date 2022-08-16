import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, Store } from 'cache-manager';

@Injectable()
export class RedisService {
    private store: Store;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        this.store = cacheManager.store;
    }

    async set(key: string, value: any, options?: any) {
        await this.store.set(key, value, options);
    }

    async get(key: string) {
        return await this.store.get(key);
    }

    async delStartWith(key: string) {
        const keys: string[] = await this.store.keys();
        if (keys.length > 0) await this.store.del(keys.filter((k) => k.startsWith(`"${key}"`)));
    }

    async del(key: string) {
        await this.store.del(key);
    }
}
