﻿using IceAndFire.Domain.DTO;
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

            var booksFromDb = await _context.Books.Find(_ => true).ToListAsync();
            if (booksFromDb.Count > 0)
            {
                Console.WriteLine("Books found in MongoDB.");
                var bookDtos = booksFromDb.Select(BookMapper.MapToDto).ToList();
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(bookDtos), TimeSpan.FromMinutes(10));
                return bookDtos;
            }

            var booksFromApi = await FetchBooksFromApiAsync();
            return booksFromApi;
        }

        public async Task<BookDto> GetBookByIsbnAsync(string isbn)
        {
            var cachedData = _redisCache.Get(isbn);
            if (cachedData != null)
            {
                Console.WriteLine("Book found in cache.");
                return JsonSerializer.Deserialize<BookDto>(cachedData);
            }

            var bookFromDb = await _context.Books.Find(b => b.Isbn == isbn).FirstOrDefaultAsync();
            if (bookFromDb != null)
            {
                Console.WriteLine("Book found in MongoDB.");
                var bookDto = BookMapper.MapToDto(bookFromDb);
                _redisCache.Set(isbn, JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));
                return bookDto;
            }

            var bookFromApi = await FetchBookFromApiAsync(isbn);
            if (bookFromApi != null)
            {
                Console.WriteLine("Book fetched from API.");
                var mappedBook = BookMapper.MapToEntity(bookFromApi);
                await _context.Books.InsertOneAsync(mappedBook);
                var bookDto = BookMapper.MapToDto(mappedBook);
                _redisCache.Set(isbn, JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));

                return bookDto;
            }
            return null;
        }

        public async Task<BookDto> CreateBookAsync(BookDto bookDto)
        {
            var bookEntity = BookMapper.MapToEntity(bookDto);
            await _context.Books.InsertOneAsync(bookEntity);

            _redisCache.Remove("books");
            _redisCache.Set(bookEntity.Isbn, JsonSerializer.Serialize(bookDto), TimeSpan.FromMinutes(10));
            return bookDto;
        }

        public async Task<BookDto> UpdateBookAsync(string isbn, BookDto updatedBookDto)
        {
            var existingBook = await _context.Books.Find(b => b.Isbn == isbn).FirstOrDefaultAsync();

            if (existingBook == null)
            {
                return null;
            }

            var bookEntity = BookMapper.MapToEntity(updatedBookDto);
            bookEntity.ObjectId = existingBook.ObjectId; 

            var result = await _context.Books.ReplaceOneAsync(b => b.Isbn == isbn, bookEntity);


            if (result.IsAcknowledged)
            {
                _redisCache.Remove("books");
                _redisCache.Remove(isbn);
                _redisCache.Set(updatedBookDto.Isbn, JsonSerializer.Serialize(updatedBookDto), TimeSpan.FromMinutes(10));
                return updatedBookDto;
            }

            return null;
        }

        public async Task<bool> DeleteBookAsync(string isbn)
        {
            var result = await _context.Books.DeleteOneAsync(b => b.Isbn == isbn);

            if (result.DeletedCount > 0)
            {
                _redisCache.Remove("books");
                _redisCache.Remove(isbn);
                return true;
            }

            return false;
        }

        private async Task<IEnumerable<BookDto>> FetchBooksFromApiAsync()
        {
            var response = await _httpClient.GetStringAsync(_apiUrl);
            var apiResponse = JsonSerializer.Deserialize<List<BookResponse>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            var books = apiResponse?.Select(BookMapper.MapToEntity).ToList() ?? new List<Book>();
            var bookDtos = books.Select(BookMapper.MapToDto).ToList();

            _redisCache.Set("books", JsonSerializer.Serialize(bookDtos), TimeSpan.FromMinutes(10));

            return bookDtos;
        }

        private async Task<BookResponse> FetchBookFromApiAsync(string isbn)
        {
            var response = await _httpClient.GetAsync($"{_apiUrl}/{isbn}");
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
