import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse } from 'src/common';
import { RedisService } from 'src/database/redis/redis.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { USER_CACHE_KEY } from './user.constant';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private readonly redisService: RedisService) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = await this.userRepository.create(createUserDto);
        this.redisService.delStartWith(USER_CACHE_KEY);

        return newUser;
    }

    async findAllAndPaging({ limit = 10, page = 1 }: QueryDto): Promise<IResponse<User>> {
        const [users, totalDocuments] = await Promise.all([
            this.userRepository.findAndPaging({ limit, page }, {}, { password: 0 }),
            this.userRepository.countDocuments()
        ]);

        return {
            data: users,
            metaData: {
                page,
                limit,
                totalDocuments,
                totalPages: Math.ceil(totalDocuments / limit)
            }
        };
    }

    async findOne(id: string) {
        const err = { errorCode: 404, errorMessage: 'User not found!' };
        const user = await this.userRepository.findByIdOrFailed(id, { password: 0 }, null, err);

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const err = { errorCode: 404, errorMessage: 'User not found!' };
        const user = await this.userRepository.findByIdAndUpdateOrFailed(id, updateUserDto, { new: true }, err);
        this.redisService.delStartWith(USER_CACHE_KEY);

        return user;
    }

    async remove(id: string) {
        const err = { errorCode: 404, errorMessage: 'User not found!' };
        const user = await this.userRepository.findByIdAndDeleteOrFailed(id, null, err);
        this.redisService.delStartWith(USER_CACHE_KEY);

        return user;
    }
}
