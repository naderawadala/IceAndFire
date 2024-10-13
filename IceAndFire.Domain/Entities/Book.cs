using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.Entities
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }  

        public string? Url { get; set; }
        public string Name { get; set; }
        public string Isbn { get; set; }
        public List<string> Authors { get; set; } = new List<string>();
        public int NumberOfPages { get; set; }
        public string? Publisher { get; set; }
        public string? Country { get; set; }
        public string? MediaType { get; set; }
        public DateTime Released { get; set; }
        public List<string> Characters { get; set; } = new List<string>();
        public List<string> PovCharacters { get; set; } = new List<string>();
    }
}
