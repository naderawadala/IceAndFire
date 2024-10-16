using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Tests.Mutations
{
    using System.Threading.Tasks;
    using Xunit;
    using Moq;
    using IceAndFire.Application.Services;
    using IceAndFire.Application.Mutations;
    using IceAndFire.Domain.DTO;
    using IceAndFire.Domain.Entities;

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;
    using Moq;
    using IceAndFire.Application.Services;
    using IceAndFire.Application.Mutations;
    using IceAndFire.Domain.DTO;
    using IceAndFire.Domain.Entities;

    public class BookMutationsTests
    {
        private readonly Mock<BookService> _mockService;
        private readonly BookMutations _mutations;

        public BookMutationsTests()
        {
            _mockService = new Mock<BookService>();
            _mutations = new BookMutations(_mockService.Object);
        }

        [Fact]
        public async Task CreateBook_ShouldReturnCreatedBook_WhenValidInputIsProvided()
        {
            var bookDto = new BookDto
            {
                Url = "http://example.com/books/a-game-of-thrones",
                Name = "A Game of Thrones",
                Isbn = "978-3-16-148410-0",
                Authors = new List<string> { "George R. R. Martin" },
                NumberOfPages = 694,
                Publisher = "Bantam Books",
                Country = "United States",
                MediaType = "Print",
                Released = new DateTime(1996, 8, 6),
                Characters = new List<string> { "Eddard Stark", "Daenerys Targaryen" },
                PovCharacters = new List<string> { "Eddard Stark", "Daenerys Targaryen" }
            };

            var createdBook = new Book
            {
                Id = "609e8c3e8b1d9b3e0a8e4c27",
                Url = bookDto.Url,
                Name = bookDto.Name,
                Isbn = bookDto.Isbn,
                Authors = bookDto.Authors,
                NumberOfPages = bookDto.NumberOfPages,
                Publisher = bookDto.Publisher,
                Country = bookDto.Country,
                MediaType = bookDto.MediaType,
                Released = bookDto.Released,
                Characters = bookDto.Characters,
                PovCharacters = bookDto.PovCharacters
            };

            _mockService.Setup(s => s.CreateBookAsync(bookDto)).ReturnsAsync(createdBook);

            var result = await _mutations.CreateBook(bookDto);

            Assert.NotNull(result);
            Assert.Equal(createdBook, result);
            _mockService.Verify(s => s.CreateBookAsync(bookDto), Times.Once);
        }

        [Fact]
        public async Task UpdateBook_ShouldReturnUpdatedBook_WhenValidInputIsProvided()
        {
            var isbn = "978-3-16-148410-0";
            var bookDto = new BookDto
            {
                Url = "http://example.com/books/a-game-of-thrones",
                Name = "A Game of Thrones",
                Isbn = isbn,
                Authors = new List<string> { "George R. R. Martin" },
                NumberOfPages = 694,
                Publisher = "Bantam Books",
                Country = "United States",
                MediaType = "Print",
                Released = new DateTime(1996, 8, 6),
                Characters = new List<string> { "Eddard Stark", "Daenerys Targaryen" },
                PovCharacters = new List<string> { "Eddard Stark", "Daenerys Targaryen" }
            };

            var updatedBook = new Book
            {
                Id = "609e8c3e8b1d9b3e0a8e4c27",
                Url = bookDto.Url,
                Name = bookDto.Name,
                Isbn = bookDto.Isbn,
                Authors = bookDto.Authors,
                NumberOfPages = bookDto.NumberOfPages,
                Publisher = bookDto.Publisher,
                Country = bookDto.Country,
                MediaType = bookDto.MediaType,
                Released = bookDto.Released,
                Characters = bookDto.Characters,
                PovCharacters = bookDto.PovCharacters
            };

            _mockService.Setup(s => s.UpdateBookAsync(isbn, bookDto)).ReturnsAsync(updatedBook);

            var result = await _mutations.UpdateBook(isbn, bookDto);

            Assert.NotNull(result);
            Assert.Equal(updatedBook, result);
            _mockService.Verify(s => s.UpdateBookAsync(isbn, bookDto), Times.Once);
        }

        [Fact]
        public async Task DeleteBook_ShouldReturnTrue_WhenBookIsDeletedSuccessfully()
        {
            var isbn = "978-3-16-148410-0";
            _mockService.Setup(s => s.DeleteBookAsync(isbn)).ReturnsAsync(true);

            var result = await _mutations.DeleteBook(isbn);

            Assert.True(result);
            _mockService.Verify(s => s.DeleteBookAsync(isbn), Times.Once);
        }

        [Fact]
        public async Task DeleteBook_ShouldReturnFalse_WhenBookDoesNotExist()
        {
            var isbn = "978-3-16-148410-0";
            _mockService.Setup(s => s.DeleteBookAsync(isbn)).ReturnsAsync(false);

            var result = await _mutations.DeleteBook(isbn);

            Assert.False(result);
            _mockService.Verify(s => s.DeleteBookAsync(isbn), Times.Once);
        }
    }


}
