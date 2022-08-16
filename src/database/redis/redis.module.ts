import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
    imports: [
        CacheModule.register({
            store: redisStore,

            // Store-specific configuration:
            host: 'localhost',
            port: 6379
        })
    ],
    providers: [RedisService],
    exports: [CacheModule, RedisService]
})
export class RedisModule {}
