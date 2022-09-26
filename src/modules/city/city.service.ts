import { Injectable } from '@nestjs/common';
import { CityRepository } from 'src/repositories/mongo/repositories/city.repository';

@Injectable()
export class CityService {
    constructor(private readonly cityRepository: CityRepository) {}

    async getAll() {
        const cities = await this.cityRepository.find();

        return cities;
    }
}
