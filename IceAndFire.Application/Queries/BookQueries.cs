using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Domain.Mappers;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class BookQueries
    {
        private readonly BookService _service;
        public BookQueries(BookService service) { 
         this._service = service;
        }
        [GraphQLDescription("Get all books")]
        public async Task<IEnumerable<Book>> GetBooks([Service] MongoDbContext context)
        {
            IEnumerable<BookDto> booksDto = await this._service.GetBooksAsync();
            return booksDto.Select(b => BookMapper.MapToEntity(b));
        }

        [GraphQLDescription("Get a book by ISBN.")]
        public async Task<Book> GetBookByIsbn(string isbn, [Service] MongoDbContext context)
        {
            BookDto bookDto = await this._service.GetBookByIsbnAsync(isbn);
            return BookMapper.MapToEntity(bookDto);
        }
    }
}
