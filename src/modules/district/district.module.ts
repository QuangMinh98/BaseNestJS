import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { MongoRepositoryModule } from 'src/repositories/mongo';

@Module({
    imports: [MongoRepositoryModule],
    controllers: [DistrictController],
    providers: [DistrictService]
})
export class DistrictModule {}
