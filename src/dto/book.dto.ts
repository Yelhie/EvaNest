import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsOptional()
    @IsNumber()
    rating?: number;
}