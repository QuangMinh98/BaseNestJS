import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongoRepositoryModule } from 'src/repositories/mongo';

@Module({
    imports: [MongoRepositoryModule],
    controllers: [CityController],
    providers: [CityService]
})
export class CityModule {}
