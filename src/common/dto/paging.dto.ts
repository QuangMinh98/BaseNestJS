import { Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, Min } from 'class-validator';

export class PagingDto {
    @Type(() => Number)
    @Min(1)
    @IsNumber()
    @IsOptional()
    page?: number;

    @Type(() => Number)
    @Min(1)
    @IsNumber()
    @IsOptional()
    limit?: number;
}
