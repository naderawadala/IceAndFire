import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    character: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

// Fetch all characters
export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
    const response = await axios.get('/api/characters');
    return response.data;
});

// Fetch character by ID
export const fetchCharacterById = createAsyncThunk('characters/fetchCharacterById', async (id) => {
    const response = await axios.get(`/api/characters/${id}`);
    return response.data;
});

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
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
            })
            .addCase(fetchCharacterById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacterById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.character = action.payload;
            })
            .addCase(fetchCharacterById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default charactersSlice.reducer;
