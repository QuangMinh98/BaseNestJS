import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { QueryDto } from './dto/query.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parseObjectId.pipe';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAllAndPaging(@Query(ValidationPipe) query: QueryDto) {
        return this.userService.findAllAndPaging(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseObjectIdPipe) id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseObjectIdPipe) id: string) {
        return this.userService.remove(id);
    }
}
