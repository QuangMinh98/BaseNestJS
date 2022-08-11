import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { hashPassword } from 'src/common/utils/helpers';

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @Transform(({ value }: TransformFnParams) => hashPassword(value))
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
