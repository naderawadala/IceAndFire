using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace IceAndFire.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly MongoDbContext _context;

        public CharacterController(MongoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCharacters()
        {
            var characters = await _context.Characters.Find(_ => true).ToListAsync();
            return Ok(characters);
        }

    }
}
