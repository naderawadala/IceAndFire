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
using Microsoft.Extensions.Configuration;

namespace IceAndFire.Application.Services
{
    public class CharacterService
    {
        private readonly String _apiUrl;
        private readonly MongoDbContext _context;
        private readonly RedisCacheService _redisCache;
        private readonly HttpClient _httpClient;

        public CharacterService(IConfiguration config, MongoDbContext context, RedisCacheService redisCache, HttpClient httpClient)
        {
            
            _apiUrl = config["ApiSettings:CharactersApiUrl"];
            _context = context;
            _redisCache = redisCache;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Character>> GetCharactersAsync()
        {
            const string cacheKey = "characters";

            var cachedData = _redisCache.Get(cacheKey);
            Console.WriteLine("PRE CACHE");
            if (cachedData != null)
            {
                Console.WriteLine("IN CACHE");
                return JsonSerializer.Deserialize<IEnumerable<Character>>(cachedData);
            }
            Console.WriteLine("post CACHE");

            var charactersFromDb = await _context.Characters.Find(_ => true).ToListAsync();
            if (charactersFromDb.Count > 0)
            {
                Console.WriteLine("IN MONGO");
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(charactersFromDb), TimeSpan.FromMinutes(10));
                return charactersFromDb;
            }
            Console.WriteLine("OUT MONGO");

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
            var response = await _httpClient.GetStringAsync(_apiUrl);

            var apiResponse = JsonSerializer.Deserialize<List<CharacterResponse>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            var characters = apiResponse?.Select(CharacterMapper.Map).ToList();

            return characters ?? new List<Character>();
        }

        public async Task<Character> GetCharacterByIdAsync(string id)
        {
            var cachedData = _redisCache.Get(id);
            if (cachedData != null)
            {
                Console.WriteLine("Character found in cache.");
                return JsonSerializer.Deserialize<Character>(cachedData);
            }

            var characterFromDb = await _context.Characters.Find(c => c.Id == id).FirstOrDefaultAsync();
            if (characterFromDb != null)
            {
                Console.WriteLine("Character found in MongoDB.");
                _redisCache.Set(id, JsonSerializer.Serialize(characterFromDb), TimeSpan.FromMinutes(10));
                return characterFromDb;
            }

            var characterFromApi = await FetchCharacterFromApiAsync(id);
            if (characterFromApi != null)
            {
                Console.WriteLine("Character fetched from API.");
                var mappedCharacter = CharacterMapper.Map(characterFromApi);

                await _context.Characters.InsertOneAsync(mappedCharacter);

                _redisCache.Set(id, JsonSerializer.Serialize(mappedCharacter), TimeSpan.FromMinutes(10));
                return mappedCharacter;
            }

            return null;
        }

        private async Task<CharacterResponse> FetchCharacterFromApiAsync(string id)
        {
            var response = await _httpClient.GetAsync(_apiUrl);
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<CharacterResponse>(jsonResponse, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
            }
            return null;
        }
    }
}
