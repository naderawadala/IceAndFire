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

        public async Task<IEnumerable<HouseDto>> GetHousesAsync()
        {
            const string cacheKey = "houses";

            var cachedData = _redisCache.Get(cacheKey);
            if (cachedData != null)
            {
                Console.WriteLine("Houses found in cache.");
                return JsonSerializer.Deserialize<IEnumerable<HouseDto>>(cachedData);
            }

            var housesFromDb = await _context.Houses.Find(_ => true).ToListAsync();
            if (housesFromDb.Count > 0)
            {
                Console.WriteLine("Houses found in MongoDB.");
                var houseDtos = housesFromDb.Select(HouseMapper.MapToDto).ToList();
                _redisCache.Set(cacheKey, JsonSerializer.Serialize(houseDtos), TimeSpan.FromMinutes(10));
                return houseDtos;
            }

            var housesFromApi = await FetchHousesFromApiAsync();
            return housesFromApi;
        }

        public async Task<HouseDto> GetHouseByNameAsync(string name)
        {
            var cachedData = _redisCache.Get(name);
            if (cachedData != null)
            {
                Console.WriteLine("House found in cache.");
                return JsonSerializer.Deserialize<HouseDto>(cachedData);
            }

            var houseFromDb = await _context.Houses.Find(h => h.Name.Equals(name)).FirstOrDefaultAsync();
            if (houseFromDb != null)
            {
                Console.WriteLine("House found in MongoDB.");
                var houseDto = HouseMapper.MapToDto(houseFromDb);
                _redisCache.Set(name, JsonSerializer.Serialize(houseDto), TimeSpan.FromMinutes(10));
                return houseDto;
            }

            var houseFromApi = await FetchHouseFromApiAsync(name);
            if (houseFromApi != null)
            {
                Console.WriteLine("House fetched from API.");
                var mappedHouse = HouseMapper.MapToEntity(houseFromApi);
                await _context.Houses.InsertOneAsync(mappedHouse);
                var houseDto = HouseMapper.MapToDto(mappedHouse);
                _redisCache.Set(name, JsonSerializer.Serialize(houseDto), TimeSpan.FromMinutes(10));

                return houseDto;
            }
            return null;
        }

        public async Task<HouseDto> CreateHouseAsync(HouseDto houseDto)
        {
            var houseEntity = HouseMapper.MapToEntity(houseDto);
            await _context.Houses.InsertOneAsync(houseEntity);

            _redisCache.Remove("houses");
            _redisCache.Set(houseEntity.Name, JsonSerializer.Serialize(houseDto), TimeSpan.FromMinutes(10));
            return houseDto;
        }

        public async Task<HouseDto> UpdateHouseAsync(string name, HouseDto updatedHouseDto)
        {
            var existingHouse = await _context.Houses.Find(h => h.Name.Equals(name)).FirstOrDefaultAsync();

            if (existingHouse == null)
            {
                return null;
            }

            var houseEntity = HouseMapper.MapToEntity(updatedHouseDto);
            houseEntity.Id = existingHouse.Id;

            var result = await _context.Houses.ReplaceOneAsync(h => h.Name.Equals(name), houseEntity);

            if (result.IsAcknowledged)
            {
                _redisCache.Remove("houses");
                _redisCache.Remove(name);
                _redisCache.Set(updatedHouseDto.Name, JsonSerializer.Serialize(updatedHouseDto), TimeSpan.FromMinutes(10));
                return updatedHouseDto;
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

        private async Task<IEnumerable<HouseDto>> FetchHousesFromApiAsync()
        {
            var response = await _httpClient.GetStringAsync(_apiUrl);
            var apiResponse = JsonSerializer.Deserialize<List<HouseResponse>>(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });


            var houses = apiResponse?.Select(HouseMapper.MapToEntity).ToList() ?? new List<House>();
            var houseDtos = houses.Select(HouseMapper.MapToDto).ToList();

            _redisCache.Set("houses", JsonSerializer.Serialize(houseDtos), TimeSpan.FromMinutes(10));

            return houseDtos;
        }

        private async Task<HouseResponse> FetchHouseFromApiAsync(string name)
        {
            var response = await _httpClient.GetAsync($"{_apiUrl}/?name={name}");
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var houseArray = JsonSerializer.Deserialize<List<HouseResponse>>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            return houseArray?.FirstOrDefault();
        }
    }
}

