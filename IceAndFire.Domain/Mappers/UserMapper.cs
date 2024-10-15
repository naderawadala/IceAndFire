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
   public static class UserMapper
    {
            public static UserDto MapToDto(User user)
            {
                if (user == null) return null;

            return new UserDto
            {
                Username = user.Username,
                Password = user.Password
            };
            }

            public static User MapToEntity(UserDto dto, string Id = null)
            {
                if (dto == null) return null;

                return new User
                {
                    Id = string.IsNullOrEmpty(Id) ? ObjectId.GenerateNewId().ToString() : Id,
                    Username = dto.Username,
                    Password = dto.Password,
                    RefreshToken = null,
                    RefreshTokenExpiration = null
                };
            }
        }
}
