import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongoRepositoryModule } from 'src/repositories/mongo';

@Module({
    imports: [MongoRepositoryModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
