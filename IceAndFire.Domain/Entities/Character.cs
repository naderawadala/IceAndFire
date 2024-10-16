using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace IceAndFire.Domain.Entities
{
    public class Character
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("gender")]
        public string? Gender { get; set; }

        [BsonElement("culture")]
        public string? Culture { get; set; }

        [BsonElement("born")]
        public string? Born { get; set; }

        [BsonElement("died")]
        public string? Died { get; set; }

        [BsonElement("titles")]
        public List<string>? Titles { get; set; }

        [BsonElement("aliases")]
        public List<string>? Aliases { get; set; }

        [BsonElement("father")]
        public string? Father { get; set; }

        [BsonElement("mother")]
        public string? Mother { get; set; }

        [BsonElement("spouse")]
        public string? Spouse { get; set; }

        [BsonElement("allegiances")]
        public List<string>? Allegiances { get; set; }

        [BsonElement("books")]
        public List<string>? Books { get; set; }

        [BsonElement("povBooks")]
        public List<string>? PovBooks { get; set; }

        [BsonElement("tvSeries")]
        public List<string>? TvSeries { get; set; }

        [BsonElement("playedBy")]
        public List<string>? PlayedBy { get; set; }
    }
}
