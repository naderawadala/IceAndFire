// src/redux/charactersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all characters
export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
              characters {
                aliases
                allegiances
                books
                born
                culture
                died
                father
                gender
                id
                mother
                name
                playedBy
                povBooks
                spouse
                titles
                tvSeries
                url
              }
            }`,
        }),
    });
    const data = await response.json();
    return data.data.characters; // Return all characters
});

// Fetch character by ID
export const fetchCharacterById = createAsyncThunk('characters/fetchCharacterById', async (id) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
              character(id: "${id}") {
                aliases
                allegiances
                books
                born
                culture
                died
                father
                gender
                id
                mother
                name
                playedBy
                povBooks
                spouse
                titles
                tvSeries
                url
              }
            }`,
        }),
    });
    const data = await response.json();
    return data.data.character; // Return the character by ID
});

// Character slice setup (initial state and reducers)
const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        character: null,
        characters: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters = action.payload; // Store fetched characters
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCharacterById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacterById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.character = action.payload; // Store fetched character by ID
            })
            .addCase(fetchCharacterById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default charactersSlice.reducer;
