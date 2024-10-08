using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Queries
{
    public class BookQueries
    {
        public async Task<IEnumerable<Book>> GetBooks([Service] MongoDbContext context)
        {
            return await context.Books.Find(_ => true).ToListAsync(); 
        }

        [GraphQLDescription("Get a book by ISBN.")]
        public async Task<Book> GetBookByIsbn(string isbn, [Service] MongoDbContext context)
        {
            return await context.Books.Find(b => b.Isbn == isbn).FirstOrDefaultAsync(); 
        }

        [GraphQLDescription("Create a new book.")]
        public async Task<Book> CreateBook(Book book, [Service] MongoDbContext context)
        {
            await context.Books.InsertOneAsync(book); 
            return book; 
        }

        [GraphQLDescription("Update an existing book.")]
        public async Task<Book> UpdateBook(string isbn, Book updatedBook, [Service] MongoDbContext context)
        {
            var result = await context.Books.ReplaceOneAsync(b => b.Isbn == isbn, updatedBook);
            return result.IsAcknowledged ? updatedBook : null; 
        }

        [GraphQLDescription("Delete a book by ISBN.")]
        public async Task<bool> DeleteBook(string isbn, [Service] MongoDbContext context)
        {
            var result = await context.Books.DeleteOneAsync(b => b.Isbn == isbn);
            return result.DeletedCount > 0; 
        }
    }
}
