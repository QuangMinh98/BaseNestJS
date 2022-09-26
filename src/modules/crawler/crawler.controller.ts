import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
    constructor(private readonly crawlerService: CrawlerService) {}

    @Get('getCities')
    getCities() {
        return this.crawlerService.getCities();
    }

    @Get('getDistricts')
    getDistricts() {
        return this.crawlerService.getDistricts();
    }

    @Get('getWards')
    getWards() {
        return this.crawlerService.getWards();
    }

    @Get('getProjects')
    getProject() {
        return this.crawlerService.getProject();
    }

    @Get('getRealEstate')
    getRealEstate() {
        return this.crawlerService.getRealEstate();
    }

    @Get('getRealEstate/getDetail')
    getDetailRealEstate() {
        return this.crawlerService.getDetailRealEstate();
    }
}
