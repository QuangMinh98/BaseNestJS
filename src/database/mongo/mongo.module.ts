import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/config';

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
    providers: [],
    exports: [MongooseModule]
})
export class MongoModule {}
