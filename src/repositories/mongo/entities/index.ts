import { User, UserSchema } from 'src/modules/user/entities/user.entity';
import { City, CitySchema } from 'src/modules/city';
import { District, DistrictSchema } from 'src/modules/district';
import { Ward, WardSchema } from 'src/modules/ward';
import { Project, ProjectSchema } from 'src/modules/project';
import { RealEstate, RealEstateSchema } from 'src/modules/real-estate';

export const entities = [
    { name: User.name, schema: UserSchema },
    { name: City.name, schema: CitySchema },
    { name: District.name, schema: DistrictSchema },
    { name: Ward.name, schema: WardSchema },
    { name: Project.name, schema: ProjectSchema },
    { name: RealEstate.name, schema: RealEstateSchema }
];
