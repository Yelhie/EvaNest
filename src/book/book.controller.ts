
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Book } from './book.entity';
import {BooksService} from "./book.service";
import {CreateBookDto} from "../dto/book.dto";


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    async createBook(@Body() body: CreateBookDto) {
        const book = await this.booksService.create(body);
        return { id: book.id, name: book.name, author: book.author, genre: book.genre, rating: book.rating };
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updatedBook: Partial<Book>): Promise<Book> {
        return this.booksService.update(id, updatedBook);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.booksService.remove(id);
    }
}
