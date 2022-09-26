import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { entities } from './entities';
import { CityRepository } from './repositories/city.repository';
import { DistrictRepository } from './repositories/district.repository';
import { ProjectRepository } from './repositories/project.repository';
import { RealEstateRepository } from './repositories/real-estate.repository';
import { UserRepository } from './repositories/user.repository';
import { WardRepository } from './repositories/ward.repository';

const providers = [
    UserRepository,
    CityRepository,
    DistrictRepository,
    WardRepository,
    ProjectRepository,
    RealEstateRepository
];

@Module({
    imports: [MongooseModule.forFeature(entities)],
    providers,
    exports: [MongooseModule, ...providers]
})
export class MongoRepositoryModule {}
