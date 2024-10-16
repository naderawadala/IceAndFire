using HotChocolate.Authorization;
using IceAndFire.Application.Services;
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
        private readonly HouseService _service;
        public HouseQueries(HouseService service)
        {
            this._service = service;
        }

        [GraphQLDescription("Get all houses.")]
        public async Task<IEnumerable<House>> GetHouses(int pageNumber = 1, int pageSize = 10)
        {
            IEnumerable<House> houses = await this._service.GetHousesAsync(pageNumber, pageSize);
            return houses;
        }


        [GraphQLDescription("Get a house by name.")]
        public async Task<House> GetHouseByName(string name, [Service] MongoDbContext context)
        {
            House house = await this._service.GetHouseByNameAsync(name);
            return house;
        }
    }
}
