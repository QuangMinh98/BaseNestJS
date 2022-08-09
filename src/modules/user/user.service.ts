import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/common/interface/response.inteface';
import { UserRepository } from 'src/repositories/mongo';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async findAllAndPaging({ limit = 10, page = 1 }: QueryDto): Promise<IResponse<User>> {
        const [users, totalDocuments] = await Promise.all([
            this.userRepository.findAndPaging({ limit, page }),
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

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
