import { Controller, Get } from '@nestjs/common';
import { DistrictService } from './district.service';

@Controller('district')
export class DistrictController {
    constructor(private readonly districtService: DistrictService) {}

    @Get()
    getDistricts() {
        return this.districtService.getDistricts();
    }
}
