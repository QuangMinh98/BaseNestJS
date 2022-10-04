import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    findByEmail(email: string, projection?: Record<string, unknown>) {
        return this.findOne({ email }, projection);
    }
}
