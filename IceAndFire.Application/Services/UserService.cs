using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Domain.Mappers;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
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

        public async Task<User> RegisterUserAsync(UserDto userDto)
        {
            Console.WriteLine("Reach first?");

            // Check if the username already exists
            var existingUser = await _context.Users
                .Find(u => u.Username == userDto.Username)
                .FirstOrDefaultAsync();

            if (existingUser != null)
            {
                throw new Exception("Username already exists.");
            }

            Console.WriteLine("Reach here");

            // Hash the password
            userDto.Password = _passwordHasher.HashPassword(userDto.Password);
            var user = UserMapper.MapToEntity(userDto);

            // Check if this is the first user
            var userCount = await _context.Users.CountDocumentsAsync(new BsonDocument());
            if (userCount == 0)
            {
                user.Role = "Admin"; // First user becomes admin
            }
            else
            {
                user.Role = "User"; // Subsequent users are regular users
            }

            Console.WriteLine("Reached here");

            // Insert the new user into the database
            await _context.Users.InsertOneAsync(user);

            return user;
        }


        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users.Find(u => u.Username == loginDto.Username).FirstOrDefaultAsync();
            if (user == null || _passwordHasher.VerifyHashedPassword(user.Password, loginDto.Password) != PasswordVerificationResult.Success)
            {
                throw new Exception("Invalid username or password.");
            }

            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiration = DateTime.Now.AddMinutes(7);

            var token = GenerateToken(user);
            user.Token = token;

            await _context.Users.ReplaceOneAsync(u => u.Id == user.Id, user);

            var token = GenerateToken(user);

            return new LoginResponseDto
            {
                Token = token,
                Role = user.Role,
                RefreshToken = user.RefreshToken
            };
        }



        public string GenerateToken(User user)
        {
            Console.WriteLine("back to gen token");
            var claims = new[]
            {
            new Claim("subject", user.Username),
            new Claim("jti", user.Id.ToString()),
            new Claim("role", user.Role)
        };

            //var keyBytes = GenerateSecureKey(256); 
            //byte[] keyBytes = Convert.FromBase64String(_config["Jwt:Key"]);
           // var key = new SymmetricSecurityKey(keyBytes);
            var key = new SymmetricSecurityKey(ConvertHexStringToByteArray(_config["Jwt:Key"]));
            Console.WriteLine($"Key Length: {key.KeySize} bits");
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var jwtToken = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
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
            var principal = GetPrincipalFromExpiredToken(token);

            Console.WriteLine("Claims in the ClaimsPrincipal:");
            foreach (var claim in principal.Claims)
            {
                Console.WriteLine($"Type: {claim.Type}, Value: {claim.Value}");
            }

            // Retrieve the 'sub' claim
            var usernameClaim = principal.FindFirst("subject");
            if (usernameClaim == null)
            {
                Console.WriteLine("sub claim not found.");
                throw new SecurityTokenException("Invalid token.");
            }

            var username = usernameClaim.Value; // Get the username from the sub claim
            Console.WriteLine($"principal username: {username}");

            var user = await _context.Users.Find(u => u.Username == username).FirstOrDefaultAsync();

            if (user == null)
            {
                Console.WriteLine("User not found.");
                throw new SecurityTokenException("User not found.");
            }

            if (user.RefreshToken != refreshToken)
            {
                Console.WriteLine("Refresh token does not match.");
                throw new SecurityTokenException("Invalid refresh token.");
            }

            if (user.RefreshTokenExpiration <= DateTime.Now)
            {
                Console.WriteLine("Refresh token has expired.");
                throw new SecurityTokenException("Refresh token has expired. Please log in again.");
            }

            Console.WriteLine("Refresh token validated successfully.");
            return GenerateToken(user);
        }


        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(ConvertHexStringToByteArray(_config["Jwt:Key"])),
                ValidateLifetime = false // Allow expired tokens for refresh
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            // Log claims for debugging
            if (jwtSecurityToken != null)
            {
                Console.WriteLine("Claims in validated token:");
                foreach (var claim in jwtSecurityToken.Claims)
                {
                    Console.WriteLine($"{claim.Type}: {claim.Value}");
                }
            }

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }




        private byte[] ConvertHexStringToByteArray(string hex)
        {
            int numberChars = hex.Length;
            byte[] bytes = new byte[numberChars / 2];
            for (int i = 0; i < numberChars; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            return bytes;
        }
    }
}
