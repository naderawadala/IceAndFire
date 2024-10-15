using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.Mappers
{
    public static class HouseMapper
    {
        public static HouseDto MapToDto(House house)
        {
            if (house == null) return null;

            return new HouseDto
            {
                Url = house.Url,
                Name = house.Name,
                Region = house.Region,
                CoatOfArms = house.CoatOfArms,
                Words = house.Words,
                Titles = house.Titles ?? new List<string>(),
                Seats = house.Seats ?? new List<string>(),
                CurrentLord = house.CurrentLord,
                Heir = house.Heir,
                Overlord = house.Overlord,
                Founded = house.Founded,
                Founder = house.Founder,
                DiedOut = house.DiedOut,
                AncestralWeapons = house.AncestralWeapons ?? new List<string>(),
                CadetBranches = house.CadetBranches ?? new List<string>(),
                SwornMembers = house.SwornMembers ?? new List<string>()
            };
        }

        public static House MapToEntity(HouseDto dto, string Id = null)
        {
            if (dto == null) return null;

            return new House
            {
                Id = string.IsNullOrEmpty(Id) ? ObjectId.GenerateNewId().ToString() : Id,
                Url = dto.Url,
                Name = dto.Name,
                Region = dto.Region,
                CoatOfArms = dto.CoatOfArms,
                Words = dto.Words,
                Titles = dto.Titles ?? new List<string>(),
                Seats = dto.Seats ?? new List<string>(),
                CurrentLord = dto.CurrentLord,
                Heir = dto.Heir,
                Overlord = dto.Overlord,
                Founded = dto.Founded,
                Founder = dto.Founder,
                DiedOut = dto.DiedOut,
                AncestralWeapons = dto.AncestralWeapons ?? new List<string>(),
                CadetBranches = dto.CadetBranches ?? new List<string>(),
                SwornMembers = dto.SwornMembers ?? new List<string>()
            };
        }
    }
}
