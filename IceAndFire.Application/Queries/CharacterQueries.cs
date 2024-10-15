using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Driver;
using HotChocolate;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace IceAndFire.Application.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class CharacterQueries
    {
        [GraphQLDescription("Get all characters.")]
        public async Task<IEnumerable<Character>> GetCharacters([Service] MongoDbContext context)
        {
            return await context.Characters.Find(_ => true).ToListAsync();
        }

        [GraphQLDescription("Get a character by ID.")]
        public async Task<Character> GetCharacterById(string id, [Service] MongoDbContext context)
        {
            return await context.Characters.Find(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}
