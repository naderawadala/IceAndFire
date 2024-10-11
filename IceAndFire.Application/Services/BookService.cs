using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Domain.Mappers;
using IceAndFire.Domain.ResponseBodies;
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

        public BookService(IConfiguration config, MongoDbContext context, RedisCacheService redisCache, HttpClient httpClient)
        {
            _apiUrl = config["ApiSettings:BooksApiUrl"];
            _context = context;
            _redisCache = redisCache;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<BookDto>> GetBooksAsync()
        {
            const string cacheKey = "books";

            var cachedData = _redisCache.Get(cacheKey);
            if (cachedData != null)
            {
                Console.WriteLine("Books found in cache.");
                return JsonSerializer.Deserialize<IEnumerable<BookDto>>(cachedData);
            }
            Console.WriteLine("in here");

            var booksFromDb = await _context.Books.Find(_ => true).ToListAsync();

            Console.WriteLine("OUT here");
            if (booksFromDb.Count > 0)
            {
                Console.WriteLine("Books found in MongoDB.");
                var bookDtos = booksFromDb.Select(BookMapper.MapToDto).ToList();
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(bookDtos), TimeSpan.FromMinutes(10));
                return bookDtos;
            }
            Console.WriteLine("before here");
            var booksFromApi = await FetchBooksFromApiAsync();
            return booksFromApi;
        }

        public async Task<BookDto> GetBookByNameAsync(string name)
        {
            var cachedData = _redisCache.Get(name);
            if (cachedData != null)
            {
                Console.WriteLine("Book found in cache.");
                return JsonSerializer.Deserialize<BookDto>(cachedData);
            }

            var bookFromDb = await _context.Books.Find(b => b.Name.Equals(name)).FirstOrDefaultAsync();
            if (bookFromDb != null)
            {
                Console.WriteLine("Book found in MongoDB.");
                var bookDto = BookMapper.MapToDto(bookFromDb);
                _redisCache.Set(name, JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));
                _redisCache.Set("books", JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));
                return bookDto;
            }

            var bookFromApi = await FetchBookFromApiAsync(name);
            if (bookFromApi != null)
            {
                Console.WriteLine("Book fetched from API.");
                var mappedBook = BookMapper.MapToEntity(bookFromApi);
                await _context.Books.InsertOneAsync(mappedBook);
                var bookDto = BookMapper.MapToDto(mappedBook);
                _redisCache.Set(name, JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));
                _redisCache.Set("books", JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));

                return bookDto;
            }
            return null;
        }

        public async Task<BookDto> CreateBookAsync(BookDto bookDto)
        {
            var bookEntity = BookMapper.MapToEntity(bookDto);
            await _context.Books.InsertOneAsync(bookEntity);

            _redisCache.Set(bookDto.Name, JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));
            _redisCache.Remove("books");
            return bookDto;
        }

        public async Task<BookDto> UpdateBookAsync(string isbn, BookDto updatedBookDto)
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
            var bookEntity = BookMapper.MapToEntity(updatedBookDto);
            bookEntity.Id = existingBook.Id;

            var result = await _context.Books.ReplaceOneAsync(b => b.Isbn.Equals(isbn), bookEntity);


            if (result.IsAcknowledged)
            {
                _redisCache.Remove("books");
                _redisCache.Remove(existingBook.Name);
                return updatedBookDto;
            }

            return null;
        }

        public async Task<bool> DeleteBookAsync(string isbn)
        {
            Console.WriteLine(isbn);
            var result = await _context.Books.DeleteOneAsync(b => b.Isbn.Equals(isbn));
            Console.WriteLine(result.DeletedCount.ToString());
            if (result.DeletedCount > 0)
            {
                _redisCache.Remove("books");
                return true;
            }

            return false;
        }

        private async Task<IEnumerable<BookDto>> FetchBooksFromApiAsync()
        {
            Console.WriteLine("in here unc");
            var response = await _httpClient.GetStringAsync(_apiUrl);
            var apiResponse = JsonSerializer.Deserialize<List<BookResponse>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            Console.WriteLine("preconvert IN BOOKS API FETCH");
            var books = apiResponse?.Select(BookMapper.MapToEntity).ToList() ?? new List<Book>();
            await _context.Books.InsertManyAsync(books);

            var bookDtos = books.Select(BookMapper.MapToDto).ToList();
            Console.WriteLine("SUM TING WONG");
            _redisCache.Set("books", JsonSerializer.Serialize(bookDtos), TimeSpan.FromMinutes(10));
            Console.WriteLine("SUM TING WONG 666");
            return bookDtos;
        }

        private async Task<BookResponse> FetchBookFromApiAsync(string name)
        {
            var response = await _httpClient.GetAsync($"{_apiUrl}/?name={name}");
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<BookResponse>(jsonResponse, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
            }
            return null;
        }
    }
}
