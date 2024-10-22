import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from '../Dto/user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from '../Dto/updateUser.dto';

@Controller('auth')
export class UserController {
    constructor(private usersService: UserService) {}


    @Post('/signup')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.usersService.create(body.email, body.password);
        return { id: user.id, email: user.email };
    }


    @Get(':id')
    async findUserById(@Param('id') id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    @Get()
    async getAllUsers() {
        const users = await this.usersService.findAll();
        return users.map((user) => ({ id: user.id, email: user.email }));
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
        const user = await this.usersService.update(id, body.email, body.password);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return { id: user.id, email: user.email };
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        const userExists = await this.usersService.findOne(id);
        if (!userExists) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.usersService.remove(id);
        return { message: `User with id ${id} deleted` };
    }
}
