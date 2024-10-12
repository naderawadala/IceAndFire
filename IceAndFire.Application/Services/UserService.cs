using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Services
{
    public class UserService
    {
        private readonly MongoDbContext _context;
        private readonly IConfiguration _config;
        private readonly IPasswordHasher _passwordHasher;
        public UserService(MongoDbContext context, IConfiguration config, IPasswordHasher passwordHasher)
        {
            _context = context;
            _config = config;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserDto> RegisterUserAsync(UserDto userDto)
        {
            Console.WriteLine("reach first?");
            var existingUser = await _context.Users
            .Find(u => u.Username == userDto.Username)
            .FirstOrDefaultAsync();

            if (existingUser != null)
            {
                throw new Exception("Username already exists.");
            }
            Console.WriteLine("reach here");
            var user = new User
            {
                Username = userDto.Username,
                Password = _passwordHasher.HashPassword(userDto.Password)
            };
            Console.WriteLine("reached here");
           await _context.Users.InsertOneAsync(user);

            return new UserDto
            {
                Username = user.Username,
                Password = user.Password
            };
        }

        public async Task<string> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users.Find(u => u.Username == loginDto.Username).FirstOrDefaultAsync();
            if (user == null || _passwordHasher.VerifyHashedPassword(user.Password, loginDto.Password) != PasswordVerificationResult.Success)
            {
                throw new Exception("Invalid username or password.");
            }

            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiration = DateTime.Now.AddMinutes(5);
            await _context.Users.ReplaceOneAsync(u => u.Id == user.Id, user);


            return GenerateToken(user);
        }


        public string GenerateToken(User user)
        {

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<string> RefreshTokenAsync(string token, string refreshToken)
        {
            var principal = GetPrincipalFromExpiredToken(token);  // Helper method to read token even after expiry
            var username = principal.Identity.Name;

            var user = await _context.Users.Find(u => u.Username == username).FirstOrDefaultAsync();

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiration <= DateTime.Now)
            {
                throw new SecurityTokenException("Invalid refresh token.");
            }

            // Generate new JWT token
            return GenerateToken(user);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }


    }
}
