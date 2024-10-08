using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using MongoDB.Driver;
using HotChocolate;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace IceAndFire.Application.Queries
{
    public class CharacterQueries
    {
        public async Task<IEnumerable<Character>> getCharacters([Service] MongoDbContext context)
        {
            return await context.Characters.Find(_ => true).ToListAsync();
        }

        [GraphQLDescription("Get a character by ID.")]
        public async Task<Character> getCharacterById(string id, [Service] MongoDbContext context)
        {
            if (ObjectId.TryParse(id, out ObjectId objectId))
            {
                return await context.Characters.Find(c => c.Id == objectId).FirstOrDefaultAsync();
            }

            return null;
        }
    }
}
