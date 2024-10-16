import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice/booksSlice';
import charactersReducer from './charactersSlice/charactersSlice';
import housesReducer from './housesSlice/housesSlice';
import authReducer from './authSlice/authSlice'

const store = configureStore({
    reducer: {
        books: booksReducer,
        characters: charactersReducer,
        houses: housesReducer,
        auth: authReducer,
    },
});

export default store;
