using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.DTO
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string Role { get; set; }
        public string RefreshToken { get; set; }
    }
}
