using FluentValidation;
using IceAndFire.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.Validators
{
    public class BookInputValidator : AbstractValidator<BookDto>
    {
        public BookInputValidator()
        {
            RuleFor(b => b.Name)
                .NotEmpty().WithMessage("Book name is required.")
                .Length(2, 100).WithMessage("Book name must be between 2 and 100 characters.");

            RuleFor(b => b.Isbn)
                .NotEmpty().WithMessage("ISBN is required.")
                .Matches(@"\b\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}\b")
                .WithMessage("Invalid ISBN format. Example: 978-3-16-148410-0");

            RuleFor(b => b.Authors)
                .NotEmpty().WithMessage("At least one author is required.")
                .Must(authors => authors.All(a => !string.IsNullOrWhiteSpace(a)))
                .WithMessage("Author names cannot be empty.");

            RuleFor(b => b.NumberOfPages)
                .GreaterThan(0).WithMessage("Number of pages must be greater than zero.");

            RuleFor(b => b.Publisher)
                .NotEmpty().WithMessage("Publisher is required.")
                .MaximumLength(50).WithMessage("Publisher name cannot exceed 50 characters.");

            RuleFor(b => b.Country)
                .NotEmpty().WithMessage("Country is required.");

            RuleFor(b => b.MediaType)
                .NotEmpty().WithMessage("Media type is required.");

            RuleFor(b => b.Released)
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Release date cannot be in the future.");

            RuleFor(b => b.Characters)
                .Must(characters => characters == null || characters.All(c => !string.IsNullOrWhiteSpace(c)))
                .WithMessage("Character names cannot be empty strings.");

            RuleFor(b => b.PovCharacters)
                .Must(povCharacters => povCharacters == null || povCharacters.All(c => !string.IsNullOrWhiteSpace(c)))
                .WithMessage("POV character names cannot be empty strings.");
        }
    }
    
}
