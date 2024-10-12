// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import charactersReducer from './charactersSlice';
import housesReducer from './housesSlice';

const store = configureStore({
    reducer: {
        books: booksReducer,
        characters: charactersReducer,
        houses: housesReducer,
    },
});

export default store;
