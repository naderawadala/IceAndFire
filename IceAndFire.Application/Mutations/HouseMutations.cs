using AppAny.HotChocolate.FluentValidation;
using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Validators;
using IceAndFire.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class HouseMutations
    {
        private readonly HouseService _service;
        public HouseMutations(HouseService service)
        {
            this._service = service;
        }

        [GraphQLDescription("Create a new House.")]
        public async Task<HouseDto> CreateHouse([UseFluentValidation, UseValidator<HouseInputValidator>] HouseDto houseDto, [Service] MongoDbContext context)
        {
            HouseDto createdHouseDto = await this._service.CreateHouseAsync(houseDto);
            return createdHouseDto;
        }

        [GraphQLDescription("Update an existing house.")]
        public async Task<HouseDto> UpdateHouse(string name, [UseFluentValidation, UseValidator<HouseInputValidator>] HouseDto houseDto, [Service] MongoDbContext context)
        {
            HouseDto updatedHouseDto = await this._service.UpdateHouseAsync(name, houseDto);
            return updatedHouseDto;
        }

        [GraphQLDescription("Delete a house by name.")]
        public async Task<bool> DeleteHouse(string name, [Service] MongoDbContext context)
        {
            bool isDeleted = await this._service.DeleteHouseAsync(name);
            return isDeleted;
        }
    }
}
