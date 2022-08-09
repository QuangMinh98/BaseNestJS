import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { hashPassword } from 'src/common/utils/helpers';

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }: TransformFnParams) => hashPassword(value))
    @IsString()
    @IsNotEmpty()
    password: string;
}
