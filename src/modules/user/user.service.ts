import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse } from 'src/common/interface/response.inteface';
import { UserRepository } from 'src/repositories/mongo';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = await this.userRepository.create(createUserDto);
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
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException({ errorCode: 404, errorMessage: 'User not found!' });

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findByIdAndUpdate(id, updateUserDto, { new: true });
        return user;
    }

    async remove(id: string) {
        const user = await this.userRepository.findByIdAndDelete(id);
        return user;
    }
}
