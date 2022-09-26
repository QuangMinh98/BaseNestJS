import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from 'src/modules/city';
import { BaseRepository } from '../base-repository';

@Injectable()
export class CityRepository extends BaseRepository<CityDocument> {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {
        super(cityModel);
    }
}
