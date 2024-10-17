using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Domain.Mappers;
using IceAndFire.Infrastructure.Caching;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static HotChocolate.ErrorCodes;

namespace IceAndFire.Application.Services
{
    public class BookService
    {
        private readonly string _apiUrl;
        private readonly MongoDbContext _context;
        private readonly RedisCacheService _redisCache;
        private readonly HttpClient _httpClient;

        private const string cacheKey = "books";

        public BookService(IConfiguration config, MongoDbContext context, RedisCacheService redisCache, HttpClient httpClient)
        {
            _apiUrl = config["ApiSettings:BooksApiUrl"];
            _context = context;
            _redisCache = redisCache;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            var cachedData = _redisCache.Get(cacheKey);
            if (cachedData != null)
            {
                // TODO: SOMETHING WRONG WITH CACHING, FIX
                // return JsonSerializer.Deserialize<IEnumerable<Book>>(cachedData);
            }

            var booksFromDb = await _context.Books.Find(_ => true).ToListAsync();

            if (booksFromDb.Count > 0)
            {

                _redisCache.Set(cacheKey, JsonSerializer.Serialize(booksFromDb), TimeSpan.FromMinutes(10));
                return booksFromDb;
            }
            var booksFromApi = await FetchBooksFromApiAsync();
            return booksFromApi;
        }
        
        public async Task<Book> GetBookByNameAsync(string name)
        {
            var cachedData = _redisCache.Get(name);
            if (cachedData != null)
            {
                return JsonSerializer.Deserialize<Book>(cachedData);
            }

            var bookFromDb = await _context.Books.Find(b => b.Name.Equals(name)).FirstOrDefaultAsync();
            if (bookFromDb != null)
            {
                var bookDto = BookMapper.MapToDto(bookFromDb);
                _redisCache.Set(name, JsonSerializer.Serialize(bookFromDb), TimeSpan.FromMinutes(10));
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(bookFromDb), TimeSpan.FromMinutes(10));
                return bookFromDb;
            }

            Book bookFromApi = await FetchBookFromApiAsync(name);
            if (bookFromApi != null)
            {
                //var mappedBook = BookMapper.MapToEntity(bookFromApi);
                await _context.Books.InsertOneAsync(bookFromApi);
                //var bookDto = BookMapper.MapToDto(mappedBook);
                _redisCache.Set(name, JsonSerializer.Serialize(bookFromApi), TimeSpan.FromMinutes(10));
                _redisCache.Remove(cacheKey);

                return bookFromApi;
            }
            return null;
        }

        public async Task<Book> CreateBookAsync(BookDto bookDto)
        {
            var existingBook = await _context.Books.Find(b => b.Isbn.Equals(bookDto.Isbn)).AnyAsync();
            if (existingBook)
            {
                throw new InvalidOperationException("A book with this ISBN already exists.");
            }

            var bookEntity = BookMapper.MapToEntity(bookDto);
            await _context.Books.InsertOneAsync(bookEntity);

            _redisCache.Set(bookEntity.Name, JsonSerializer.Serialize(bookEntity), TimeSpan.FromMinutes(10));
            _redisCache.Remove(cacheKey);
            return bookEntity;
        }

        public async Task<Book> UpdateBookAsync(string isbn, BookDto updatedBookDto)
        {
            var existingBook = await _context.Books.Find(b => b.Isbn.Equals(isbn)).FirstOrDefaultAsync();
            
            if (existingBook == null)
            {
                return null;
            }

            if (!existingBook.Isbn.Equals(updatedBookDto.Isbn))
            {
                var isbnAlreadyTaken = await _context.Books
                    .Find(b => b.Isbn.Equals(updatedBookDto.Isbn))
                    .FirstOrDefaultAsync();

                if (isbnAlreadyTaken != null)
                {
                    throw new InvalidOperationException("The book ISBN is already taken by another book.");
                }
            }

            var bookEntity = BookMapper.MapToEntity(updatedBookDto, existingBook.Id);

            var result = await _context.Books.ReplaceOneAsync(b => b.Isbn.Equals(isbn), bookEntity);


            if (result.IsAcknowledged)
            {
                _redisCache.Remove(cacheKey);
                _redisCache.Remove(existingBook.Name);
                return bookEntity;
            }

            return null;
        }

        public async Task<bool> DeleteBookAsync(string isbn)
        {
            var book = await _context.Books.Find(b => b.Isbn.Equals(isbn)).FirstOrDefaultAsync();

            if (book == null)
            {
                return false;
            }


            var result = await _context.Books.DeleteOneAsync(b => b.Isbn.Equals(isbn));


            if (result.DeletedCount > 0)
            {
                _redisCache.Remove(book.Name);
                return true;
            }

            return false;
        }


        private async Task<IEnumerable<Book>> FetchBooksFromApiAsync()
        {
            var response = await _httpClient.GetStringAsync($"{_apiUrl}/?pageSize=50");
            var bookDtos = JsonSerializer.Deserialize<List<Book>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            //var books = bookDtos?.Select(BookMapper.MapToEntity).ToList() ?? new List<Book>();
            //var books = bookDtos?.ToList() ?? new List<Book>();
            await _context.Books.InsertManyAsync(bookDtos);

            _redisCache.Set(cacheKey, JsonSerializer.Serialize(bookDtos), TimeSpan.FromMinutes(10));
            return bookDtos;
        }

        private async Task<Book> FetchBookFromApiAsync(string name)
        {
            var response = await _httpClient.GetAsync($"{_apiUrl}/?name={name}");
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<Book>(jsonResponse, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
            }
            return null;
        }
    }
}
