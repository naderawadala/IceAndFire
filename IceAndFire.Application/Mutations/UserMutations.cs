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
    public class UserMutations
    {
        private readonly UserService _service;
        public UserMutations(UserService service)
        {
            this._service = service;
        }
        [GraphQLDescription("Register a new user.")]
        public async Task<UserDto> Register(UserDto userDto, [Service] MongoDbContext context)
        {
            Console.WriteLine("TEST DOES IT EVEN REACH?");
            UserDto registeredUserDto = await this._service.RegisterUserAsync(userDto);
            return registeredUserDto;
        }

        [GraphQLDescription("Log in a user and return a JWT token.")]
        public async Task<string> Login(LoginDto loginDto)
        {
            return await _service.LoginAsync(loginDto);
        }

        [GraphQLDescription("Refresh the JWT token using a valid refresh token.")]
        public async Task<string> RefreshToken([UseFluentValidation] RefreshTokenDto refreshTokenDto)
        {
            return await _service.RefreshTokenAsync(refreshTokenDto.Token, refreshTokenDto.RefreshToken);
        }
    }
}
