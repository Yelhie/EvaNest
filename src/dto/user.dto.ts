import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
