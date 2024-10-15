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

namespace IceAndFire.Application.Services
{
    public class HouseService
    {
        private readonly string _apiUrl;
        private readonly MongoDbContext _context;
        private readonly RedisCacheService _redisCache;
        private readonly HttpClient _httpClient;

        public HouseService(IConfiguration config, MongoDbContext context, RedisCacheService redisCache, HttpClient httpClient)
        {
            _apiUrl = config["ApiSettings:HousesApiUrl"];
            _context = context;
            _redisCache = redisCache;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<House>> GetHousesAsync()
        {
            const string cacheKey = "houses";

            var cachedData = _redisCache.Get(cacheKey);
            if (cachedData != null)
            {
                Console.WriteLine("Houses found in cache.");
               // return JsonSerializer.Deserialize<IEnumerable<House>>(cachedData);
            }

            var housesFromDb = await _context.Houses.Find(_ => true).ToListAsync();
            if (housesFromDb.Count > 0)
            {
                Console.WriteLine("Houses found in MongoDB.");
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(housesFromDb), TimeSpan.FromMinutes(10));
                return housesFromDb;
            }

            var housesFromApi = await FetchHousesFromApiAsync();
            return housesFromApi;
        }

        public async Task<House> GetHouseByNameAsync(string name)
        {
            var cachedData = _redisCache.Get(name);
            if (cachedData != null)
            {
                Console.WriteLine("House found in cache.");
                // return JsonSerializer.Deserialize<House>(cachedData);
            }

            var houseFromDb = await _context.Houses.Find(h => h.Name.Equals(name)).FirstOrDefaultAsync();
            if (houseFromDb != null)
            {
                Console.WriteLine("House found in MongoDB.");
                //var houseDto = HouseMapper.MapToDto(houseFromDb);
                _redisCache.Set(name, JsonSerializer.Serialize(houseFromDb), TimeSpan.FromMinutes(10));
                return houseFromDb;
            }

            var houseFromApi = await FetchHouseFromApiAsync(name);
            if (houseFromApi != null)
            {
                Console.WriteLine("House fetched from API.");
                //var mappedHouse = HouseMapper.MapToEntity(houseFromApi);
                await _context.Houses.InsertOneAsync(houseFromApi);
                _redisCache.Set(name, JsonSerializer.Serialize(houseFromApi), TimeSpan.FromMinutes(10));

                return houseFromApi;
            }
            return null;
        }

        public async Task<House> CreateHouseAsync(HouseDto houseDto)
        {
            var houseEntity = HouseMapper.MapToEntity(houseDto);
            await _context.Houses.InsertOneAsync(houseEntity);

            _redisCache.Remove("houses");
            _redisCache.Set(houseEntity.Name, JsonSerializer.Serialize(houseEntity), TimeSpan.FromMinutes(10));
            return houseEntity;
        }

        public async Task<House> UpdateHouseAsync(string name, HouseDto updatedHouseDto)
        {
            var existingHouse = await _context.Houses.Find(h => h.Name.Equals(name)).FirstOrDefaultAsync();

            if (existingHouse == null)
            {
                return null;
            }

            var houseEntity = HouseMapper.MapToEntity(updatedHouseDto, existingHouse.Id);

            var result = await _context.Houses.ReplaceOneAsync(h => h.Name.Equals(name), houseEntity);

            if (result.IsAcknowledged)
            {
                _redisCache.Remove("houses");
                _redisCache.Remove(name);
                _redisCache.Set(updatedHouseDto.Name, JsonSerializer.Serialize(houseEntity), TimeSpan.FromMinutes(10));
                return houseEntity;
            }

            return null;
        }

        public async Task<bool> DeleteHouseAsync(string name)
        {
            var result = await _context.Houses.DeleteOneAsync(h => h.Name.Equals(name));

            if (result.DeletedCount > 0)
            {
                _redisCache.Remove("houses");
                _redisCache.Remove(name);
                return true;
            }

            return false;
        }

        private async Task<IEnumerable<House>> FetchHousesFromApiAsync()
        {
            var response = await _httpClient.GetStringAsync(_apiUrl);
            var houseDtos = JsonSerializer.Deserialize<List<House>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            await _context.Houses.InsertManyAsync(houseDtos);

            _redisCache.Set("houses", JsonSerializer.Serialize(houseDtos), TimeSpan.FromMinutes(10));

            return houseDtos;
        }

        private async Task<House> FetchHouseFromApiAsync(string name)
        {
            var response = await _httpClient.GetAsync($"{_apiUrl}/?name={name}");
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var houseArray = JsonSerializer.Deserialize<List<House>>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            return houseArray?.FirstOrDefault();
        }
    }
}

