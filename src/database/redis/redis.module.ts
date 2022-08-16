import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from 'src/config';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                store: redisStore,

                // Store-specific configuration:
                host: configService.get('redisHost'),
                port: configService.get('redisPort'),
                password: configService.get('redisPassword')
            }),
            inject: [ConfigService]
        })
    ],
    providers: [RedisService],
    exports: [CacheModule, RedisService]
})
export class RedisModule {}
