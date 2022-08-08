import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './database/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [ConfigModule, MongoModule, UserModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
