using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Queries
{
    public class HouseQueries
    {
        // Get all houses
        public async Task<IEnumerable<House>> GetHouses([Service] MongoDbContext context)
        {
            return await context.Houses.Find(_ => true).ToListAsync();
        }

        [GraphQLDescription("Get a house by name.")]
        public async Task<House> GetHouseByName(string name, [Service] MongoDbContext context)
        {
            return await context.Houses.Find(h => h.Name == name).FirstOrDefaultAsync();
        }

        [GraphQLDescription("Create a new house.")]
        public async Task<House> CreateHouse(House house, [Service] MongoDbContext context)
        {
            await context.Houses.InsertOneAsync(house);
            return house;
        }

        [GraphQLDescription("Update an existing house.")]
        public async Task<House> UpdateHouse(string name, House updatedHouse, [Service] MongoDbContext context)
        {
            var result = await context.Houses.ReplaceOneAsync(h => h.Name == name, updatedHouse);
            return result.IsAcknowledged ? updatedHouse : null;
        }

        [GraphQLDescription("Delete a house by name.")]
        public async Task<bool> DeleteHouse(string name, [Service] MongoDbContext context)
        {
            var result = await context.Houses.DeleteOneAsync(h => h.Name == name);
            return result.DeletedCount > 0;
        }
    }
}
