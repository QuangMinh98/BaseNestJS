import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { QueryDto } from './dto/query.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parseObjectId.pipe';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('me')
    findMe(@User() user: reqUser) {
        return this.userService.findOne(user.id);
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
