import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
import {CreateBookDto} from "../dto/book.dto";

@Injectable()
export class BooksService {
    private books: Book[] = [];
    private idCounter = 1;

    async create(book: CreateBookDto): Promise<Book> {
        const newBook = { id: this.idCounter++, ...book };
        this.books.push(newBook);
        return newBook;
    }

    async findAll(): Promise<Book[]> {
        return this.books;
    }

    async findOne(id: number): Promise<Book> {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async update(id: number, updatedBook: Partial<Book>): Promise<Book> {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        this.books[bookIndex] = { ...this.books[bookIndex], ...updatedBook };
        return this.books[bookIndex];
    }

    async remove(id: number): Promise<void> {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        this.books.splice(bookIndex, 1);
    }
}
