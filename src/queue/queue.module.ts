import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from 'src/config';
import { QueueConsumer } from './consumers/queue.consumer';

@Module({
    imports: [
        BullModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host: configService.get('redisHost'),
                    port: configService.get('redisPort'),
                    password: configService.get('redisPassword')
                }
            }),
            inject: [ConfigService]
        }),
        BullModule.registerQueue({
            name: 'queue'
        })
    ],
    providers: [QueueConsumer],
    exports: [BullModule, QueueConsumer]
})
export class QueueModule {}
