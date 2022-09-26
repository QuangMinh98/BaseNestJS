import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ward, WardDocument } from 'src/modules/ward';
import { BaseRepository } from '../base-repository';

@Injectable()
export class WardRepository extends BaseRepository<WardDocument> {
    constructor(@InjectModel(Ward.name) private wardModel: Model<WardDocument>) {
        super(wardModel);
    }
}
