using FluentValidation;
using IceAndFire.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;

public class HouseInputValidator : AbstractValidator<HouseDto>
{
    public HouseInputValidator()
    {
        RuleFor(h => h.Name)
            .NotEmpty().WithMessage("House name is required.")
            .Length(2, 100).WithMessage("House name must be between 2 and 100 characters.");

        RuleFor(h => h.Region)
            .NotEmpty().WithMessage("Region is required.")
            .Length(2, 100).WithMessage("Region must be between 2 and 100 characters.");

        RuleFor(h => h.CoatOfArms)
            .NotEmpty().WithMessage("Coat of Arms description is required.")
            .MaximumLength(200).WithMessage("Coat of Arms description cannot exceed 200 characters.");

        RuleFor(h => h.Words)
            .NotEmpty().WithMessage("Words (motto) are required.")
            .MaximumLength(100).WithMessage("Words cannot exceed 100 characters.");

        RuleFor(h => h.Titles)
            .Must(titles => titles == null || titles.All(t => !string.IsNullOrWhiteSpace(t)))
            .WithMessage("Titles must not contain empty or whitespace values.");

        RuleFor(h => h.Seats)
            .Must(seats => seats == null || seats.All(s => !string.IsNullOrWhiteSpace(s)))
            .WithMessage("Seats must not contain empty or whitespace values.");

        RuleFor(h => h.CurrentLord)
            .MaximumLength(100).WithMessage("Current Lord's name cannot exceed 100 characters.");

        RuleFor(h => h.Heir)
            .MaximumLength(100).WithMessage("Heir's name cannot exceed 100 characters.");

        RuleFor(h => h.Overlord)
            .MaximumLength(100).WithMessage("Overlord's name cannot exceed 100 characters.");

        RuleFor(h => h.Founded)
            .MaximumLength(100).WithMessage("Founded date cannot exceed 100 characters.");

        RuleFor(h => h.Founder)
            .MaximumLength(100).WithMessage("Founder's name cannot exceed 100 characters.");

        RuleFor(h => h.DiedOut)
            .MaximumLength(100).WithMessage("Died out description cannot exceed 100 characters.");

        RuleFor(h => h.AncestralWeapons)
            .Must(weapons => weapons == null || weapons.All(w => !string.IsNullOrWhiteSpace(w)))
            .WithMessage("Ancestral weapons must not contain empty or whitespace values.");

        RuleFor(h => h.CadetBranches)
            .Must(branches => branches == null || branches.All(b => !string.IsNullOrWhiteSpace(b)))
            .WithMessage("Cadet branches must not contain empty or whitespace values.");

        RuleFor(h => h.SwornMembers)
            .Must(members => members == null || members.All(m => !string.IsNullOrWhiteSpace(m)))
            .WithMessage("Sworn members must not contain empty or whitespace values.");
    }
}
