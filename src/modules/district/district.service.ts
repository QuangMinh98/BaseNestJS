import { Injectable } from '@nestjs/common';
import { DistrictRepository } from 'src/repositories/mongo/repositories/district.repository';

@Injectable()
export class DistrictService {
    constructor(private readonly districtRepository: DistrictRepository) {}

    async getDistricts() {
        const districts = await this.districtRepository.find().populate('city');

        return districts;
    }
}
