using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Config;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Infrastructure.Persistence
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<TEntity> Set<TEntity>() where TEntity : class
        {
            return _database.GetCollection<TEntity>(typeof(TEntity).Name.ToLower());
        }

        public IMongoCollection<Character> Characters => _database.GetCollection<Character>("characters");
        public IMongoCollection<Book> Books => _database.GetCollection<Book>("books");
        public IMongoCollection<House> Houses => _database.GetCollection<House>("houses");

        public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    }
}
