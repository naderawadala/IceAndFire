﻿using IceAndFire.Application.Queries;
using IceAndFire.Domain.Entities;
using IceAndFire.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using IceAndFire.Application.Services;
using IceAndFire.Domain.DTO;
using HotChocolate.Authorization;
using IceAndFire.Domain.Validators;
using FluentValidation.Results;
using AppAny.HotChocolate.FluentValidation;

namespace IceAndFire.Application.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class BookMutations
    {
        private readonly BookService _service;
        public BookMutations(BookService service)
        {
            this._service = service;
        }
        [GraphQLDescription("Create a new book.")]
        public async Task<Book> CreateBook([UseFluentValidation, UseValidator<BookInputValidator>] BookDto bookDto)
        {
            Book createdBookDto = await this._service.CreateBookAsync(bookDto);
            return createdBookDto;
        }

        [GraphQLDescription("Update an existing book.")]
        public async Task<Book> UpdateBook(string isbn, [UseFluentValidation, UseValidator<BookInputValidator>] BookDto bookDto)
        {
            Book updatedBookDto = await this._service.UpdateBookAsync(isbn, bookDto);
            return updatedBookDto;
        }

        [GraphQLDescription("Delete a book by ISBN.")]
        public async Task<bool> DeleteBook(string isbn)
        {
            bool isDeleted = await this._service.DeleteBookAsync(isbn);
            return isDeleted;
        }
    }
}
