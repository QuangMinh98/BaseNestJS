import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './database/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';
import { MongoRepositoryModule } from './repositories/mongo';

@Module({
    imports: [MorganModule, ConfigModule, MongoModule, MongoRepositoryModule, UserModule],
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
