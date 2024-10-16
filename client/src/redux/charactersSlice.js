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
              }
            }`,
        }),
    });
    const data = await response.json();
    return data.data.characters; // Return all characters
});

// Fetch character by ID
export const fetchCharacterByName = createAsyncThunk('characters/fetchCharacterByName', async (name) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
              characterByName(name: "${name}") {
                aliases
                allegiances
                books
                born
                culture
                died
                father
                gender
                mother
                name
                playedBy
                povBooks
                spouse
                titles
                tvSeries
              }
            }`,
        }),
    });
    const data = await response.json();
    console.log(data)
    return data.data.characterByName; // Return the character by name
});

// Character slice setup (initial state and reducers)
const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        character: null,
        items: [],
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
                state.items = action.payload; // Store fetched characters
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCharacterByName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacterByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.character = action.payload; // Store fetched character by ID
            })
            .addCase(fetchCharacterByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default charactersSlice.reducer;
