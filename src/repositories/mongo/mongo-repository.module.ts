import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { entities } from './entities';
import { UserRepository } from './repositories/user.repository';

const providers = [UserRepository];

@Global()
@Module({
    imports: [MongooseModule.forFeature(entities)],
    providers,
    exports: [MongooseModule, ...providers]
})
export class MongoRepositoryModule {}
