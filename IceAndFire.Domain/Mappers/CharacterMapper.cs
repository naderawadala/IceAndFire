using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace IceAndFire.Domain.Mappers
{
    public static class CharacterMapper
    {
        public static CharacterDto MapToDto(Character character)
        {
            if (character == null) return null;

            return new CharacterDto
            {
                Url = character.Url,
                Name = character.Name,
                Gender = character.Gender,
                Culture = character.Culture,
                Born = character.Born,
                Died = character.Died,
                Titles = character.Titles ?? new List<string>(),
                Aliases = character.Aliases ?? new List<string>(),
                Father = character.Father,
                Mother = character.Mother,
                Spouse = character.Spouse,
                Allegiances = character.Allegiances ?? new List<string>(),
                Books = character.Books ?? new List<string>(),
                PovBooks = character.PovBooks ?? new List<string>(),
                TvSeries = character.TvSeries ?? new List<string>(),
                PlayedBy = character.PlayedBy ?? new List<string>()
            };
        }

        public static Character MapToEntity(CharacterDto dto)
        {
            if (dto == null) return null;

            return new Character
            {
                Id = Regex.Match(dto.Url, @"/(\d+)").Groups[1].Value,
                Url = dto.Url,
                Name = dto.Name,
                Gender = dto.Gender,
                Culture = dto.Culture,
                Born = dto.Born,
                Died = dto.Died,
                Titles = dto.Titles ?? new List<string>(),
                Aliases = dto.Aliases ?? new List<string>(),
                Father = dto.Father,
                Mother = dto.Mother,
                Spouse = dto.Spouse,
                Allegiances = dto.Allegiances ?? new List<string>(),
                Books = dto.Books ?? new List<string>(),
                PovBooks = dto.PovBooks ?? new List<string>(),
                TvSeries = dto.TvSeries ?? new List<string>(),
                PlayedBy = dto.PlayedBy ?? new List<string>(),
            };
        }
    }
}
