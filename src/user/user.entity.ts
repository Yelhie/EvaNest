import {
    AfterInsert,
    BeforeRemove,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    private readonly logger = new Logger(User.name);

    @AfterInsert()
    logInsert() {
        this.logger.log(`User created with id ${this.id}`);
    }

    @BeforeRemove()
    logRemove() {
        this.logger.log(`User with id ${this.id} is being deleted`);
    }

    @BeforeUpdate()
    logUpdate() {
        this.logger.log(`User with id ${this.id} is being updated`);
    }
}
