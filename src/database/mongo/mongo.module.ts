import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/config';
import { entities } from './entities';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('connectionString')
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeature(entities)
    ],
    providers: [],
    exports: [MongooseModule]
})
export class MongoModule {}
