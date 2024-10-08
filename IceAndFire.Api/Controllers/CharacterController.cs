using IceAndFire.Application.Queries;
using IceAndFire.Application.Services;
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
        private readonly CharacterService _service;
        private readonly CharacterQueries _query;
        // add redis later

        public CharacterController(MongoDbContext context, CharacterService service, CharacterQueries query)
        {
            _context = context;
            _service = service;
            _query = query;
        }

        [HttpGet]
        public async Task<IActionResult> GetCharacters()
        {
            var characters = await _context.Characters.Find(_ => true).ToListAsync();
            return Ok(characters);
        }

    }
}
