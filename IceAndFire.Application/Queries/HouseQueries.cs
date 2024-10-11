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
    [ExtendObjectType(typeof(Query))]
    public class HouseQueries
    {
        [GraphQLDescription("Get all houses.")]
        public async Task<IEnumerable<House>> GetHouses([Service] MongoDbContext context)
        {
            return await context.Houses.Find(_ => true).ToListAsync();
        }

        [GraphQLDescription("Get a house by name.")]
        public async Task<House> GetHouseByName(string name, [Service] MongoDbContext context)
        {
            return await context.Houses.Find(h => h.Name == name).FirstOrDefaultAsync();
        }
    }
}
