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

        public string Url { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Culture { get; set; }
        public string Born { get; set; }
        public string Died { get; set; }
        public List<string> Titles { get; set; } = new List<string>();
        public List<string> Aliases { get; set; } = new List<string>();
        public string Father { get; set; }
        public string Mother { get; set; }
        public List<string> Spouse { get; set; } = new List<string>();
        public List<string> Allegiances { get; set; } = new List<string>();
        public List<string> Books { get; set; } = new List<string>();
        public List<string> PovBooks { get; set; } = new List<string>();
        public List<string> TvSeries { get; set; } = new List<string>();
        public List<string> PlayedBy { get; set; } = new List<string>();
    }
}
}
