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
                Console.WriteLine("Books found in cache.");
                // TODO: SOMETHING WRONG WITH CACHING, FIX
                // return JsonSerializer.Deserialize<IEnumerable<Book>>(cachedData);
            }
            Console.WriteLine("in here");

            var booksFromDb = await _context.Books.Find(_ => true).ToListAsync();

            Console.WriteLine("OUT here");
            if (booksFromDb.Count > 0)
            {
                Console.WriteLine("Books found in MongoDB.");
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(booksFromDb), TimeSpan.FromMinutes(10));
                return booksFromDb;
            }
            Console.WriteLine("before here");
            var booksFromApi = await FetchBooksFromApiAsync();
            return booksFromApi;
        }
        
        public async Task<Book> GetBookByNameAsync(string name)
        {
            var cachedData = _redisCache.Get(name);
            if (cachedData != null)
            {
                Console.WriteLine("Book found in cache.");
                return JsonSerializer.Deserialize<Book>(cachedData);
            }

            var bookFromDb = await _context.Books.Find(b => b.Name.Equals(name)).FirstOrDefaultAsync();
            if (bookFromDb != null)
            {
                Console.WriteLine("Book found in MongoDB.");
                var bookDto = BookMapper.MapToDto(bookFromDb);
                _redisCache.Set(name, JsonSerializer.Serialize(bookFromDb), TimeSpan.FromMinutes(10));
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(bookFromDb), TimeSpan.FromMinutes(10));
                return bookFromDb;
            }

            Book bookFromApi = await FetchBookFromApiAsync(name);
            if (bookFromApi != null)
            {
                Console.WriteLine("Book fetched from API.");
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
            var bookEntity = BookMapper.MapToEntity(bookDto);
            await _context.Books.InsertOneAsync(bookEntity);

            _redisCache.Set(bookEntity.Name, JsonSerializer.Serialize(bookEntity), TimeSpan.FromMinutes(10));
            _redisCache.Remove(cacheKey);
            return bookEntity;
        }

        public async Task<Book> UpdateBookAsync(string isbn, BookDto updatedBookDto)
        {
            Console.WriteLine("started update");
            Console.WriteLine(isbn);
            var existingBook = await _context.Books.Find(b => b.Isbn.Equals(isbn)).FirstOrDefaultAsync();
            Console.WriteLine("reached update 4");
            Console.WriteLine(existingBook.Id);
            Console.WriteLine(existingBook.Isbn);
            Console.WriteLine(existingBook == null);
            if (existingBook == null)
            {
                return null;
            }

            Console.WriteLine("reached update");
            var bookEntity = BookMapper.MapToEntity(updatedBookDto, existingBook.Id);

            var result = await _context.Books.ReplaceOneAsync(b => b.Isbn.Equals(isbn), bookEntity);


            if (result.IsAcknowledged)
            {
                _redisCache.Remove(cacheKey);
                _redisCache.Remove(bookEntity.Name);
                return bookEntity;
            }

            return null;
        }

        public async Task<bool> DeleteBookAsync(string isbn)
        {
            var book = await _context.Books.Find(b => b.Isbn.Equals(isbn)).FirstOrDefaultAsync();

            if (book == null)
            {
                Console.WriteLine($"No book found with ISBN: {isbn}");
                return false;
            }

            Console.WriteLine($"Deleting book: {book.Name}");

            var result = await _context.Books.DeleteOneAsync(b => b.Isbn.Equals(isbn));

            Console.WriteLine($"Deleted count: {result.DeletedCount}");

            if (result.DeletedCount > 0)
            {
                _redisCache.Remove(book.Name);
                return true;
            }

            return false;
        }


        private async Task<IEnumerable<Book>> FetchBooksFromApiAsync()
        {
            Console.WriteLine("in here unc");
            var response = await _httpClient.GetStringAsync(_apiUrl);
            var bookDtos = JsonSerializer.Deserialize<List<Book>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            Console.WriteLine("preconvert IN BOOKS API FETCH");
            //var books = bookDtos?.Select(BookMapper.MapToEntity).ToList() ?? new List<Book>();
            //var books = bookDtos?.ToList() ?? new List<Book>();
            await _context.Books.InsertManyAsync(bookDtos);

            Console.WriteLine("SUM TING WONG");
            _redisCache.Set(cacheKey, JsonSerializer.Serialize(bookDtos), TimeSpan.FromMinutes(10));
            Console.WriteLine("SUM TING WONG 666");
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
