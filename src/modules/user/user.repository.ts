import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/entities/user.entity';
import { BaseRepository } from 'src/common/repositories/mongo';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    findByEmail(email: string, projection?: Record<string, unknown>) {
        return this.findOne({ email }, projection);
    }
}
