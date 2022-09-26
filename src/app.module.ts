import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './database/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';
import { MongoRepositoryModule } from './repositories/mongo';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './database/redis';
import { TaskModule } from './task/task.module';
import { QueueModule } from './queue';

@Module({
    imports: [
        MorganModule,
        ConfigModule,
        MongoModule,
        RedisModule,
        MongoRepositoryModule,
        TaskModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: MorganInterceptor('combined')
        }
    ]
})
export class AppModule {}
