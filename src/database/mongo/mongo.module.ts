import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/config';
import { mongoProviders } from './mongo.provider';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('connectionString')
            }),
            inject: [ConfigService]
        })
    ],
    providers: [...mongoProviders],
    exports: [MongooseModule]
})
export class MongoModule {}
