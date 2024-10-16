using FluentAssertions;
using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Moq;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNet.Identity;

namespace IceAndFire.Tests
{
    public class UserServiceTests
    {
        private readonly Mock<IMongoCollection<User>> _userCollectionMock;
        private readonly Mock<MongoDbContext> _mongoDbContextMock;
        private readonly IConfiguration _config;
        private readonly Mock<IPasswordHasher> _passwordHasherMock;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _userCollectionMock = new Mock<IMongoCollection<User>>();
            _mongoDbContextMock = new Mock<MongoDbContext>();
            _config = new ConfigurationBuilder().Build();
            _passwordHasherMock = new Mock<IPasswordHasher>();

            _mongoDbContextMock.Setup(m => m.Users).Returns(_userCollectionMock.Object);
            _userService = new UserService(_mongoDbContextMock.Object, _config, _passwordHasherMock.Object);
        }

        [Fact]
        public async Task RegisterUserAsync_ShouldRegisterUser_WhenUsernameIsUnique()
        {
            var userDto = new UserDto { Username = "uniqueUser", Password = "ValidPassword123!" };

            _userCollectionMock.Setup(m => m.Find(It.IsAny<FilterDefinition<User>>(), null))
                .Returns(Mock.Of<IFindFluent<User, User>>());

            var findFluentMock = new Mock<IFindFluent<User, User>>();
            findFluentMock.Setup(m => m.FirstOrDefaultAsync(default)).ReturnsAsync((User)null);

            _userCollectionMock.Setup(m => m.Find(It.IsAny<FilterDefinition<User>>(), null))
                .Returns(findFluentMock.Object);

            _passwordHasherMock.Setup(m => m.HashPassword(userDto.Password))
                .Returns("hashedPassword");

            var result = await _userService.RegisterUserAsync(userDto);

            result.Should().NotBeNull();
            result.Username.Should().Be(userDto.Username);
            _userCollectionMock.Verify(m => m.InsertOneAsync(It.IsAny<User>(), null, default), Times.Once);
        }

        [Fact]
        public async Task RegisterUserAsync_ShouldThrowException_WhenUsernameAlreadyExists()
        {
            var userDto = new UserDto { Username = "existingUser", Password = "ValidPassword123!" };
            var existingUser = new User { Username = "existingUser" };

            var findFluentMock = new Mock<IFindFluent<User, User>>();
            findFluentMock.Setup(m => m.FirstOrDefaultAsync(default)).ReturnsAsync(existingUser);

            _userCollectionMock.Setup(m => m.Find(It.IsAny<FilterDefinition<User>>(), null))
                .Returns(findFluentMock.Object);

            Func<Task> act = async () => await _userService.RegisterUserAsync(userDto);

            await act.Should().ThrowAsync<Exception>()
                .WithMessage("Username already exists.");
        }
    }
}
