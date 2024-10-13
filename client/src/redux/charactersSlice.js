// src/store/charactersSlice.js
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
    return data.data.characters;
});

// Create a new character
export const createCharacter = createAsyncThunk('characters/createCharacter', async (newCharacter) => {
    // Implement character creation logic here
});

// Update an existing character
export const updateCharacter = createAsyncThunk('characters/updateCharacter', async ({ id, updatedCharacter }) => {
    // Implement character update logic here
});

// Delete a character
export const deleteCharacter = createAsyncThunk('characters/deleteCharacter', async (id) => {
    // Implement character deletion logic here
});

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
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
                state.items = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default charactersSlice.reducer;
