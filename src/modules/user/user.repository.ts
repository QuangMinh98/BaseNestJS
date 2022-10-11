import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { BaseRepository } from 'src/common';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    async findByEmail(email: string, projection?: Record<string, unknown>, options?: QueryOptions<UserDocument>) {
        return this.findOne({ email }, projection, options);
    }
}
