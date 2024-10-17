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
using Microsoft.Extensions.Configuration;
using IceAndFire.Domain.DTO;

namespace IceAndFire.Application.Services
{
    public class CharacterService
    {
        private readonly string _apiUrl;
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
            if (cachedData != null)
            {
                return JsonSerializer.Deserialize<IEnumerable<Character>>(cachedData);
            }

            List<Character> charactersFromDb;
            try
            {
                charactersFromDb = await _context.Characters.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex.Message;
            }

            if (charactersFromDb != null && charactersFromDb.Count > 0)
            {
                //_redisCache.Set(cacheKey, JsonSerializer.Serialize(charactersFromDb), TimeSpan.FromMinutes(10));
                return charactersFromDb;
            }
            else
            {
                Console.WriteLine("No characters found in MongoDB.");
            }
            Console.WriteLine("after db");
            if (charactersFromDb.Count > 0)
            {
                Console.WriteLine("IN MONGO");
                //var characterDtos = charactersFromDb.Select(CharacterMapper.MapToDto).ToList();
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(charactersFromDb), TimeSpan.FromMinutes(10));
                return charactersFromDb;
            }
            Console.WriteLine("OUT MONGO");

           /* var charactersFromApi = await FetchCharactersFromApiAsync();
            if (charactersFromApi != null && charactersFromApi.Any())
            {
                Console.WriteLine("IN API");
                await _context.Characters.InsertManyAsync(charactersFromApi);

                var characterDtos = charactersFromApi.Select(CharacterMapper.MapToDto).ToList();
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(characterDtos), TimeSpan.FromMinutes(10));

                return characterDtos;
            }*/

            return new List<Character>();
        }
        /*
        private async Task<IEnumerable<Character>> FetchCharactersFromApiAsync()
        {
            var response = await _httpClient.GetStringAsync(_apiUrl);

            var apiResponse = JsonSerializer.Deserialize<List<CharacterDto>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            var characters = apiResponse?.Select(CharacterMapper.MapToEntity).ToList();

            return characters ?? new List<Character>();
        }*/

        public async Task<Character> GetCharacterByNameAsync(string name)
        {
            var cachedData = _redisCache.Get(name);
            if (cachedData != null)
            {
                return JsonSerializer.Deserialize<Character>(cachedData);
            }

            var characterFromDb = await _context.Characters.Find(c => c.Name == name).FirstOrDefaultAsync();
            if (characterFromDb != null)
            {
               // var characterDto = CharacterMapper.MapToDto(characterFromDb);
                _redisCache.Set(name, JsonSerializer.Serialize(characterFromDb), TimeSpan.FromMinutes(10));
                return characterFromDb;
            }
            /*
            var characterFromApi = await FetchCharacterFromApiAsync(id);
            if (characterFromApi != null)
            {
                Console.WriteLine("Character fetched from API.");
                var mappedCharacter = CharacterMapper.MapToEntity(characterFromApi);
                await _context.Characters.InsertOneAsync(mappedCharacter);

                _redisCache.Set(id, JsonSerializer.Serialize(characterFromApi), TimeSpan.FromMinutes(10));
                return characterFromApi;
            }*/

            return null;
        }

        private async Task<CharacterDto> FetchCharacterFromApiAsync(string id)
        {
            var response = await _httpClient.GetAsync($"{_apiUrl}/{id}");
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<CharacterDto>(jsonResponse, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
            }
            return null;
        }

    }
}
