using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Driver;
using HotChocolate;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using IceAndFire.Application.Services;

namespace IceAndFire.Application.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class CharacterQueries
    {
        private readonly CharacterService _service;
        public CharacterQueries(CharacterService service)
        {
            _service = service;
        }
        [GraphQLDescription("Get all characters.")]
        public async Task<IEnumerable<Character>> GetCharacters([Service] MongoDbContext context)
        {
            return await _service.GetCharactersAsync();
        }

        [GraphQLDescription("Get a character by ID.")]
        public async Task<Character> GetCharacterByName(string name, [Service] MongoDbContext context)
        {
            return await _service.GetCharacterByNameAsync(name);
        }
    }
}
