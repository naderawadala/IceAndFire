﻿using IceAndFire.Application.Queries;
using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using HotChocolate.Authorization;
using IceAndFire.Domain.Validators;
using FluentValidation.Results;
using AppAny.HotChocolate.FluentValidation;


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
        public async Task<User> Register([UseFluentValidation, UseValidator<UserInputValidator>] UserDto userDto)
        {
            User registeredUserDto = await this._service.RegisterUserAsync(userDto);
            return registeredUserDto;
        }

        [GraphQLDescription("Log in a user and return a JWT token and user role.")]
        public async Task<LoginResponseDto> Login(LoginDto loginDto)
        {
            var loginResponse = await _service.LoginAsync(loginDto);

            return loginResponse;
        }

        [GraphQLDescription("Refresh the JWT token using a valid refresh token.")]
        public async Task<string> RefreshToken(RefreshTokenDto refreshTokenDto)
        {
            return await _service.RefreshTokenAsync(refreshTokenDto.Token, refreshTokenDto.RefreshToken);
        }
    }
}
