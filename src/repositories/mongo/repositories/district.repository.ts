import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { District, DistrictDocument } from 'src/modules/district';
import { BaseRepository } from '../base-repository';

@Injectable()
export class DistrictRepository extends BaseRepository<DistrictDocument> {
    constructor(@InjectModel(District.name) private districtModel: Model<DistrictDocument>) {
        super(districtModel);
    }
}
