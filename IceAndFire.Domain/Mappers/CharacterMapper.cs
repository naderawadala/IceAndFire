using IceAndFire.Domain.Entities;
using IceAndFire.Domain.ResponseBodies;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace IceAndFire.Domain.Mappers
{
    public static class CharacterMapper
    {
        public static Character Map(CharacterResponse item)
        {
            return new Character
            {
                ObjectId = ObjectId.GenerateNewId(),
                Id = item.url.Split('/').LastOrDefault(),
                Url = item.url ?? "",
                Name = item.name ?? "",
                Gender = item.gender ?? "",
                Culture = item.culture ?? "",
                Born = item.born ?? "",
                Died = item.died ?? "",
                Titles = item.titles ?? new List<string>(),
                Aliases = item.aliases ?? new List<string>(),
                Father = item.father ?? "",
                Mother = item.mother ?? "",
                Spouse = item.spouse ?? "",
                Allegiances = item.allegiances ?? new List<string>(),
                Books = item.books ?? new List<string>(),
                PovBooks = item.povBooks ?? new List<string>(),
                TvSeries = item.tvSeries ?? new List<string>(),
                PlayedBy = item.playedBy ?? new List<string>(),
            };
        }
    }
}
