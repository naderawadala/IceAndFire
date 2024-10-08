using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace IceAndFire.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HouseController : ControllerBase
    {
        private readonly HouseService _service;

        public HouseController(HouseService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetHouses()
        {
            var houses = await _service.GetHousesAsync();
            return Ok(houses);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetHouseByName(string name)
        {
            Console.WriteLine("TESTNAME "+name);
            var house = await _service.GetHouseByNameAsync(name);
            if (house == null)
            {
                return NotFound();
            }
            return Ok(house);
        }

        [HttpPost]
        public async Task<IActionResult> CreateHouse([FromBody] HouseDto houseDto)
        {
            if (houseDto == null)
            {
                return BadRequest("House data is required.");
            }

            var createdHouse = await _service.CreateHouseAsync(houseDto);
            return CreatedAtAction(nameof(GetHouseByName), new { name = createdHouse.Name }, createdHouse);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateHouse(string name, [FromBody] HouseDto updatedHouseDto)
        {
            if (updatedHouseDto == null)
            {
                return BadRequest("Updated house data is required.");
            }

            var updatedHouse = await _service.UpdateHouseAsync(name, updatedHouseDto);
            if (updatedHouse == null)
            {
                return NotFound();
            }

            return Ok(updatedHouse);
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteHouse(string name)
        {
            var isDeleted = await _service.DeleteHouseAsync(name);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
