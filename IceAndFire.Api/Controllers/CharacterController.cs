using IceAndFire.Application.Queries;
using IceAndFire.Application.Services;
using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Caching;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace IceAndFire.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly CharacterService _service;

        public CharacterController(CharacterService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetCharacters()
        {
            var characters = await _service.GetCharactersAsync();
            return Ok(characters);
        }

    }
}
