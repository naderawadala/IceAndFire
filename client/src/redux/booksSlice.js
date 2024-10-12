import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
    },
});

export const { setBooks } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
