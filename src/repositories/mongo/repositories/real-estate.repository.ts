import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RealEstate, RealEstateDocument } from 'src/modules/real-estate';
import { BaseRepository } from '../base-repository';

@Injectable()
export class RealEstateRepository extends BaseRepository<RealEstateDocument> {
    constructor(@InjectModel(RealEstate.name) private realEstateModel: Model<RealEstateDocument>) {
        super(realEstateModel);
    }
}
