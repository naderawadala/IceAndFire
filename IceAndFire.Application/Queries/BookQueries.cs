using HotChocolate.Authorization;
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
            //IEnumerable<BookDto> booksDto = await this._service.GetBooksAsync();
            IEnumerable<Book> books = await this._service.GetBooksAsync();
            return books;
        }

        [GraphQLDescription("Get a book by name.")]
        public async Task<Book> GetBookByName(string name, [Service] MongoDbContext context)
        {
            // BookDto bookDto = await this._service.GetBookByNameAsync(name);
            //return BookMapper.MapToEntity(bookDto);
            Book book = await this._service.GetBookByNameAsync(name);
            return book;
        }
    }
}
