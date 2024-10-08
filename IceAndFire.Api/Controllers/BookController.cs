using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace IceAndFire.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _service;

        public BookController(BookService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _service.GetBooksAsync();
            return Ok(books);
        }

        [HttpGet("{isbn}")]
        public async Task<IActionResult> GetBookById(string isbn)
        {
            var book = await _service.GetBookByIsbnAsync(isbn);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] BookDto bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Book data is required.");
            }

            var createdBook = await _service.CreateBookAsync(bookDto);
            return CreatedAtAction(nameof(GetBookById), new { isbn = createdBook.Isbn }, createdBook);
        }

        [HttpPut("{isbn}")]
        public async Task<IActionResult> UpdateBook(string isbn, [FromBody] BookDto updatedBookDto)
        {
            if (updatedBookDto == null)
            {
                return BadRequest("Updated book data is required.");
            }

            var updatedBook = await _service.UpdateBookAsync(isbn, updatedBookDto);
            if (updatedBook == null)
            {
                return NotFound();
            }

            return Ok(updatedBook);
        }

        [HttpDelete("{isbn}")]
        public async Task<IActionResult> DeleteBook(string isbn)
        {
            var isDeleted = await _service.DeleteBookAsync(isbn);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
