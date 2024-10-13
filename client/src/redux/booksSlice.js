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
        body: JSON.stringify({ query }), // Correctly stringify the query
    });

    const data = await response.json();

    // Log the response to check for errors
    console.log('GraphQL Response:', data);

    // Check for errors in the response
    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.books; // Return the book data
});

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Use the payload to populate books
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default booksSlice.reducer;
