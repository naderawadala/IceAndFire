using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Tests.Mutations
{
    using System;
    using System.Threading.Tasks;
    using Xunit;
    using Moq;
    using IceAndFire.Application.Services;
    using IceAndFire.Application.Mutations;
    using IceAndFire.Domain.DTO;
    using IceAndFire.Domain.Entities;

    public class UserMutationsTests
    {
        private readonly Mock<UserService> _mockService;
        private readonly UserMutations _mutations;

        public UserMutationsTests()
        {
            _mockService = new Mock<UserService>();
            _mutations = new UserMutations(_mockService.Object);
        }

        [Fact]
        public async Task Register_ShouldReturnRegisteredUser_WhenValidInputIsProvided()
        {
            var userDto = new UserDto
            {
                Username = "testuser",
                Password = "password123"
            };

            var registeredUser = new User
            {
                Id = "609e8c3e8b1d9b3e0a8e4c27",
                Username = userDto.Username,
                Password = userDto.Password,
                Role = "User"
            };

            _mockService.Setup(s => s.RegisterUserAsync(userDto)).ReturnsAsync(registeredUser);

            var result = await _mutations.Register(userDto);

            Assert.NotNull(result);
            Assert.Equal(registeredUser.Username, result.Username);
            Assert.Equal(registeredUser.Role, result.Role);
            _mockService.Verify(s => s.RegisterUserAsync(userDto), Times.Once);
        }

        [Fact]
        public async Task Login_ShouldReturnLoginResponse_WhenValidCredentialsAreProvided()
        {
            var loginDto = new LoginDto
            {
                Username = "testuser",
                Password = "password123"
            };

            var loginResponse = new LoginResponseDto
            {
                Token = "sample.jwt.token",
                Role = "User",
                RefreshToken = "sample.refresh.token"
            };

            _mockService.Setup(s => s.LoginAsync(loginDto)).ReturnsAsync(loginResponse);

            var result = await _mutations.Login(loginDto);

            Assert.NotNull(result);
            Assert.Equal(loginResponse.Token, result.Token);
            Assert.Equal(loginResponse.Role, result.Role);
            Assert.Equal(loginResponse.RefreshToken, result.RefreshToken);
            _mockService.Verify(s => s.LoginAsync(loginDto), Times.Once);
        }

        [Fact]
        public async Task Login_ShouldReturnNull_WhenInvalidCredentialsAreProvided()
        {
            var loginDto = new LoginDto
            {
                Username = "invaliduser",
                Password = "wrongpassword"
            };

            _mockService.Setup(s => s.LoginAsync(loginDto)).ReturnsAsync((LoginResponseDto)null);

            var result = await _mutations.Login(loginDto);

            Assert.Null(result);
            _mockService.Verify(s => s.LoginAsync(loginDto), Times.Once);
        }
    }

}
