using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace IceAndFire.Domain.Entities
{
    public class Character
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string Name { get; set; }
        public string House { get; set; }
    }
}
