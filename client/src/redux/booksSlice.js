// src/store/booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const query = `
        query {
            books {
                name
                isbn
                url
                authors
                numberOfPages
                publisher
                country
                mediaType
                released
                characters
                povCharacters
            }
        }
    `;

    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.books;
});

// Fetch a book by name
export const fetchBookByName = createAsyncThunk('books/fetchBookByName', async (name) => {
    const query = `
        query {
            bookByName(name: "${name}") {
                name
                isbn
                url
                authors
                numberOfPages
                publisher
                country
                mediaType
                released
                characters
                povCharacters
            }
        }
    `;

    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.bookByName;
});

// Create a new book
export const createBook = createAsyncThunk('books/createBook', async (bookData) => {
    const query = `
        mutation {
            createBook(bookDto: {
                name: "${bookData.name}",
                isbn: "${bookData.isbn}",
                authors: ${JSON.stringify(bookData.authors)},
                numberOfPages: ${bookData.numberOfPages},
                publisher: "${bookData.publisher}",
                country: "${bookData.country}",
                mediaType: "${bookData.mediaType}",
                released: "${bookData.released}",
                characters: ${JSON.stringify(bookData.characters)},
                povCharacters: ${JSON.stringify(bookData.povCharacters)}
            }) {
                name
                isbn
                authors
                numberOfPages
                publisher
                country
                mediaType
                released
                characters
                povCharacters
            }
        }
    `;

    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.createBook; // Return created book's ID or other info if needed
});

// Update an existing book
export const updateBook = createAsyncThunk('books/updateBook', async ({ isbn, bookData }) => {
    console.log("Inside updateBook thunk", isbn, bookData);
    const query = `
        mutation {
             updateBook(isbn:"${isbn}", bookDto: {
                name: "${bookData.name}",
                isbn: "${bookData.isbn}",
                authors: ${JSON.stringify(bookData.authors)},
                numberOfPages: ${bookData.numberOfPages},
                publisher: "${bookData.publisher}",
                country: "${bookData.country}",
                mediaType: "${bookData.mediaType}",
                released: "${bookData.released}",
                characters: ${JSON.stringify(bookData.characters)},
                povCharacters: ${JSON.stringify(bookData.povCharacters)}
            }) {
                name
                isbn
                authors
                numberOfPages
                publisher
                country
                mediaType
                released
                characters
                povCharacters
            }
        }
    `;

    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log('Update Response:', data);

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.updateBook; // Return updated book's ID or other info if needed
});

// Delete a book
export const deleteBook = createAsyncThunk('books/deleteBook', async (isbn) => {
    const query = `
        mutation {
            deleteBook(isbn: "${isbn}")
        }
    `;

    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return isbn; // Return the ISBN of the deleted book for removal from the state
});

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        book: null, // To store fetched book data when editing
    },
    reducers: {
        clearBook(state) {
            state.book = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchBookByName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.book = action.payload;
            })
            .addCase(fetchBookByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.items.push(action.payload); // Add new book to the list
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.items.findIndex(book => book.isbn === action.payload.isbn);
                if (index !== -1) {
                    state.items[index] = action.payload; // Update the existing book
                }
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.items = state.items.filter(book => book.isbn !== action.payload); // Remove the deleted book
            });
    },
});

export const { clearBook } = booksSlice.actions;

export default booksSlice.reducer;
