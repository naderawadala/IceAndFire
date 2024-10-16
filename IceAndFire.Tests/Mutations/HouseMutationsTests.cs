using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Tests.Mutations
{
    using System.Threading.Tasks;
    using Xunit;
    using Moq;
    using IceAndFire.Application.Services;
    using IceAndFire.Application.Mutations;
    using IceAndFire.Domain.DTO;
    using IceAndFire.Domain.Entities;

    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;
    using Moq;
    using IceAndFire.Application.Services;
    using IceAndFire.Application.Mutations;
    using IceAndFire.Domain.DTO;
    using IceAndFire.Domain.Entities;

    public class HouseMutationsTests
    {
        private readonly Mock<HouseService> _mockService;
        private readonly HouseMutations _mutations;

        public HouseMutationsTests()
        {
            _mockService = new Mock<HouseService>();
            _mutations = new HouseMutations(_mockService.Object);
        }

        [Fact]
        public async Task CreateHouse_ShouldReturnCreatedHouse_WhenValidInputIsProvided()
        {
            var houseDto = new HouseDto
            {
                Url = "http://example.com/houses/stark",
                Name = "Stark",
                Region = "The North",
                CoatOfArms = "A gray direwolf on a white field",
                Words = "Winter is Coming",
                Titles = new List<string> { "Lord of Winterfell", "Warden of the North" },
                Seats = new List<string> { "Winterfell" },
                CurrentLord = "Eddard Stark",
                Heir = "Robb Stark",
                Overlord = "House Arryn",
                Founded = "Age of Heroes",
                Founder = "Brandon Stark",
                DiedOut = null,
                AncestralWeapons = new List<string> { "Ice" },
                CadetBranches = new List<string> { "House Stark of Winterfell" },
                SwornMembers = new List<string> { "Jon Snow", "Sansa Stark" }
            };

            var createdHouse = new House
            {
                Id = "609e8c3e8b1d9b3e0a8e4c27",
                Url = houseDto.Url,
                Name = houseDto.Name,
                Region = houseDto.Region,
                CoatOfArms = houseDto.CoatOfArms,
                Words = houseDto.Words,
                Titles = houseDto.Titles,
                Seats = houseDto.Seats,
                CurrentLord = houseDto.CurrentLord,
                Heir = houseDto.Heir,
                Overlord = houseDto.Overlord,
                Founded = houseDto.Founded,
                Founder = houseDto.Founder,
                DiedOut = houseDto.DiedOut,
                AncestralWeapons = houseDto.AncestralWeapons,
                CadetBranches = houseDto.CadetBranches,
                SwornMembers = houseDto.SwornMembers
            };

            _mockService.Setup(s => s.CreateHouseAsync(houseDto)).ReturnsAsync(createdHouse);

            var result = await _mutations.CreateHouse(houseDto);

            Assert.NotNull(result);
            Assert.Equal(createdHouse, result);
            _mockService.Verify(s => s.CreateHouseAsync(houseDto), Times.Once);
        }

        [Fact]
        public async Task UpdateHouse_ShouldReturnUpdatedHouse_WhenValidInputIsProvided()
        {
            var name = "Stark";
            var houseDto = new HouseDto
            {
                Url = "http://example.com/houses/stark",
                Name = "Stark",
                Region = "The North",
                CoatOfArms = "A gray direwolf on a white field",
                Words = "Winter is Coming",
                Titles = new List<string> { "Lord of Winterfell", "Warden of the North" },
                Seats = new List<string> { "Winterfell" },
                CurrentLord = "Eddard Stark",
                Heir = "Robb Stark",
                Overlord = "House Arryn",
                Founded = "Age of Heroes",
                Founder = "Brandon Stark",
                DiedOut = null,
                AncestralWeapons = new List<string> { "Ice" },
                CadetBranches = new List<string> { "House Stark of Winterfell" },
                SwornMembers = new List<string> { "Jon Snow", "Sansa Stark" }
            };

            var updatedHouse = new House
            {
                Id = "609e8c3e8b1d9b3e0a8e4c27",
                Url = houseDto.Url,
                Name = houseDto.Name,
                Region = houseDto.Region,
                CoatOfArms = houseDto.CoatOfArms,
                Words = houseDto.Words,
                Titles = houseDto.Titles,
                Seats = houseDto.Seats,
                CurrentLord = houseDto.CurrentLord,
                Heir = houseDto.Heir,
                Overlord = houseDto.Overlord,
                Founded = houseDto.Founded,
                Founder = houseDto.Founder,
                DiedOut = houseDto.DiedOut,
                AncestralWeapons = houseDto.AncestralWeapons,
                CadetBranches = houseDto.CadetBranches,
                SwornMembers = houseDto.SwornMembers
            };

            _mockService.Setup(s => s.UpdateHouseAsync(name, houseDto)).ReturnsAsync(updatedHouse);

            var result = await _mutations.UpdateHouse(name, houseDto);

            Assert.NotNull(result);
            Assert.Equal(updatedHouse, result);
            _mockService.Verify(s => s.UpdateHouseAsync(name, houseDto), Times.Once);
        }

        [Fact]
        public async Task DeleteHouse_ShouldReturnTrue_WhenHouseIsDeletedSuccessfully()
        {
            var name = "Stark";
            _mockService.Setup(s => s.DeleteHouseAsync(name)).ReturnsAsync(true);

            var result = await _mutations.DeleteHouse(name);

            Assert.True(result);
            _mockService.Verify(s => s.DeleteHouseAsync(name), Times.Once);
        }

        [Fact]
        public async Task DeleteHouse_ShouldReturnFalse_WhenHouseDoesNotExist()
        {
            var name = "Stark";
            _mockService.Setup(s => s.DeleteHouseAsync(name)).ReturnsAsync(false);

            var result = await _mutations.DeleteHouse(name);

            Assert.False(result);
            _mockService.Verify(s => s.DeleteHouseAsync(name), Times.Once);
        }
    }


}
