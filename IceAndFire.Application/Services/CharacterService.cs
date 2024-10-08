using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Caching;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using IceAndFire.Domain.Mappers;
using IceAndFire.Domain.ResponseBodies;

namespace IceAndFire.Application.Services
{
    public class CharacterService
    {
        private readonly MongoDbContext _context;
        private readonly RedisCacheService _redisCache;
        private readonly HttpClient _httpClient;

        public CharacterService(MongoDbContext context, RedisCacheService redisCache, HttpClient httpClient)
        {
            _context = context;
            _redisCache = redisCache;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Character>> GetCharactersAsync()
        {
            const string cacheKey = "characters";

            // Step 1: Check Redis Cache
            var cachedData = _redisCache.Get(cacheKey);
            Console.WriteLine("PRE CACHE");
            if (cachedData != null)
            {
                Console.WriteLine("IN CACHE");
                return JsonSerializer.Deserialize<IEnumerable<Character>>(cachedData);
            }
            Console.WriteLine("post CACHE");

            // Step 2: Check MongoDB
            var charactersFromDb = await _context.Characters.Find(_ => true).ToListAsync();
            if (charactersFromDb.Count > 0)
            {
                Console.WriteLine("IN MONGO");
                // Cache the result from DB
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(charactersFromDb), TimeSpan.FromMinutes(10));
                return charactersFromDb;
            }
            Console.WriteLine("OUT MONGO");

            // Step 3: Call External API
            var charactersFromApi = await FetchCharactersFromApiAsync();
            if (charactersFromApi != null && charactersFromApi.Any())
            {
                Console.WriteLine("IN API");
                await _context.Characters.InsertManyAsync(charactersFromApi);

                _redisCache.Set(cacheKey, JsonSerializer.Serialize(charactersFromApi), TimeSpan.FromMinutes(10));

                return charactersFromApi;
            }

            return new List<Character>(); 
        }

        private async Task<IEnumerable<Character>> FetchCharactersFromApiAsync()
        {
            var response = await _httpClient.GetStringAsync("https://anapioficeandfire.com/api/characters");

            var apiResponse = JsonSerializer.Deserialize<List<CharacterResponse>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            var characters = apiResponse?.Select(CharacterMapper.Map).ToList();

            return characters ?? new List<Character>();
        }
    }
}
