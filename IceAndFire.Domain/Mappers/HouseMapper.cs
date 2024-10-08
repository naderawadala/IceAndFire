using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Domain.ResponseBodies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.Mappers
{
    public static class HouseMapper
    {
        public static House MapToEntity(HouseResponse item)
        {
            return new House
            {
                Url = item.Url ?? "",
                Name = item.Name ?? "",
                Region = item.Region ?? "",
                CoatOfArms = item.CoatOfArms ?? "",
                Words = item.Words ?? "",
                Titles = item.Titles ?? new List<string>(),
                Seats = item.Seats ?? new List<string>(),
                CurrentLord = item.CurrentLord ?? "",
                Heir = item.Heir ?? "",
                Overlord = item.Overlord ?? "",
                Founded = item.Founded ?? "",
                Founder = item.Founder ?? "",
                DiedOut = item.DiedOut ?? "",
                AncestralWeapons = item.AncestralWeapons ?? new List<string>(),
                CadetBranches = item.CadetBranches ?? new List<string>(),
                SwornMembers = item.SwornMembers ?? new List<string>()
            };
        }

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

        public static House MapToEntity(HouseDto dto)
        {
            if (dto == null) return null;

            return new House
            {
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
