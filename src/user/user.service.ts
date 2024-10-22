import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // create a new user
    async create(email: string, password: string): Promise<User> {
        const hashedPassword = await hash(password, 10);
        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }

    // get one user by id
    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    // get all users
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // update a user by id
    async update(
        id: number,
        email?: string,
        password?: string,
    ): Promise<User | null> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        if (email) user.email = email;
        if (password) user.password = password;
        return this.usersRepository.save(user);
    }

    // delete a user by id
    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.usersRepository.remove(user);
    }
}
