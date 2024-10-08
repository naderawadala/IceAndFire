using IceAndFire.Domain.DTO;
using IceAndFire.Domain.Entities;
using IceAndFire.Domain.ResponseBodies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.Mappers
{
    public static class BookMapper
    {
        public static Book MapToEntity(BookResponse item)
        {
            return new Book
            {
                Url = item.Url ?? "",
                Name = item.Name ?? "",
                Isbn = item.Isbn ?? "",
                Authors = item.Authors ?? new List<string>(),
                NumberOfPages = item.NumberOfPages,
                Publisher = item.Publisher ?? "",
                Country = item.Country ?? "",
                MediaType = item.MediaType ?? "",
                Released = item.Released,
                Characters = item.Characters ?? new List<string>(),
                PovCharacters = item.PovCharacters ?? new List<string>()
            };
        }
        public static BookDto MapToDto(Book book)
        {
            if (book == null) return null;

            return new BookDto
            {
                Url = book.Url,
                Name = book.Name,
                Isbn = book.Isbn,
                Authors = book.Authors ?? new List<string>(),
                NumberOfPages = book.NumberOfPages,
                Publisher = book.Publisher,
                Country = book.Country,
                MediaType = book.MediaType,
                Released = book.Released,
                Characters = book.Characters ?? new List<string>(),
                PovCharacters = book.PovCharacters ?? new List<string>()
            };
        }

        public static Book MapToEntity(BookDto dto)
        {
            if (dto == null) return null;

            return new Book
            {
                Url = dto.Url,
                Name = dto.Name,
                Isbn = dto.Isbn,
                Authors = dto.Authors ?? new List<string>(),
                NumberOfPages = dto.NumberOfPages,
                Publisher = dto.Publisher,
                Country = dto.Country,
                MediaType = dto.MediaType,
                Released = dto.Released,
                Characters = dto.Characters ?? new List<string>(),
                PovCharacters = dto.PovCharacters ?? new List<string>()
            };
        }
    }
}
