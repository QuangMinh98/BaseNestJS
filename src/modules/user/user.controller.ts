import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from './dto/query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, ParseObjectIdPipe, User, ValidationPipe } from 'src/common';
import { USER_CACHE_KEY } from './user.constant';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheKey(USER_CACHE_KEY)
    findAllAndPaging(@Query(ValidationPipe) query: QueryDto) {
        return this.userService.findAllAndPaging(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    findMe(@User() user: reqUser) {
        return this.userService.findOne(user.id);
    }

    @Get(':id')
    @UseInterceptors(CacheInterceptor)
    @CacheKey(USER_CACHE_KEY)
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
