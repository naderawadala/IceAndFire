using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace IceAndFire.Infrastructure.Caching
{
    public class RedisCacheService
    {
        private readonly IDatabase _database;

        public RedisCacheService(IConnectionMultiplexer connectionMultiplexer)
        {
            _database = connectionMultiplexer.GetDatabase();
        }

        public void Set(string key, string value, TimeSpan? expiry = null)
        {
            _database.StringSet(key, value, expiry);
        }

        public string Get(string key)
        {
            return _database.StringGet(key);
        }

        public void Remove(string key)
        {
            _database.KeyDelete(key);
        }

        public void AddToCache(string key, string serializedValue)
        {
            var cachedData = Get(key);
            List<string> cachedList;
            if (!string.IsNullOrEmpty(cachedData))
            {
                cachedList = JsonSerializer.Deserialize<List<string>>(cachedData);
            }
            else
            {
                cachedList = new List<string>();
            }
            cachedList.Add(serializedValue);

            Set(key, JsonSerializer.Serialize(cachedList), TimeSpan.FromMinutes(10));
        }

    }
}
