import Client from '../database'

export type Book = {
    id : number;
    title: string;
    author: string;
    totalPages: number;
    summary: string;
}

export class BookStore {
    async create(b: Book): Promise<Book> {
        try{
            const conn = await Client.connect()
            const sql = 'INSERT INTO books(title, author, total_pages, summary) VALUES ($1,$2,$3,$4) RETURNING *'
            const result = await conn.query(sql,[b.title,b.author,b.totalPages,b.summary])
            const book = result.rows[0]
            conn.release()
            return book
        } catch (err) {
            throw new Error(`Cannot create book ${err}`)
        }
    }

    async index(): Promise<Book[]> {
        try{
            const conn = await Client.connect()
            const sql = 'SELECT * FROM books'
            const result = await conn.query(sql)
            const books = result.rows
            conn.release()
            return books
        } catch (err) {
            throw new Error(`Cannot read books. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Book[]> {
        try{
            const conn = await Client.connect()
            const sql = 'SELECT * FROM books WHERE id = $1'
            // @ts-ignore
            const result = await conn.query(sql, [id])
            const book = result.rows[0]
            conn.release()
            return book
        } catch (err) {
            throw new Error(`Could not find book id ${id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Book> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE * FROM books WHERE id=($1)'
            const result = await conn.query(sql,[id])
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot delete book`)
        }
    }

    
    async update(book: Book): Promise<Book> {
        try {
            const conn = await Client.connect()
            const sql = 'UPDATE books SET title =($1), author= ($2), total_pages ($3), summary = ($4) FROM books WHERE id=($5)'
            // @ts-ignore
            const result = await conn.query(sql,[book.title, book.author, book.totalPages, book.summary, book.id])
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot update book`)
        }
    }
}