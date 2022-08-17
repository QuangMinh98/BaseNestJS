import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse } from 'src/common/interface/response.inteface';
import { RedisService } from 'src/database/redis/redis.service';
import { UserRepository } from 'src/repositories/mongo';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly redisService: RedisService,
        private schedulerRegistry: SchedulerRegistry
    ) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = await this.userRepository.create(createUserDto);
        await this.redisService.delStartWith(this.userRepository.name);

        return newUser;
    }

    async findAllAndPaging({ limit = 10, page = 1 }: QueryDto): Promise<IResponse<User>> {
        const [users, totalDocuments] = await Promise.all([
            this.userRepository.findAndPaging({ limit, page }, {}, { password: 0 }).cache(),
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
        const user = await this.userRepository.findById(id, { password: 0 }).cache();
        if (!user) throw new NotFoundException({ errorCode: 404, errorMessage: 'User not found!' });

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findByIdAndUpdate(id, updateUserDto, { new: true });
        await this.redisService.delStartWith(this.userRepository.name);

        return user;
    }

    async remove(id: string) {
        const user = await this.userRepository.findByIdAndDelete(id);
        await this.redisService.delStartWith(this.userRepository.name);

        return user;
    }
}
