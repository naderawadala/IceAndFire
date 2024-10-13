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
    public static class BookMapper
    {
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

        public static Book MapToEntity(BookDto dto, string Id = null)
        {
            if (dto == null) return null;

            return new Book
            {
                Id = string.IsNullOrEmpty(Id) ? ObjectId.GenerateNewId().ToString() : Id,
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
