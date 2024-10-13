// src/store/housesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all houses
export const fetchHouses = createAsyncThunk('houses/fetchHouses', async () => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
              houses {
                ancestralWeapons
                cadetBranches
                coatOfArms
                currentLord
                diedOut
                founded
                founder
                heir
                id
                name
                overlord
                region
                seats
                swornMembers
                titles
                url
                words
              }
            }`,
        }),
    });
    const data = await response.json();
    return data.data.houses;
});

// Create a new house
export const createHouse = createAsyncThunk('houses/createHouse', async (newHouse) => {
    // Implement house creation logic here
});

// Update an existing house
export const updateHouse = createAsyncThunk('houses/updateHouse', async ({ id, updatedHouse }) => {
    // Implement house update logic here
});

// Delete a house
export const deleteHouse = createAsyncThunk('houses/deleteHouse', async (id) => {
    // Implement house deletion logic here
});

const housesSlice = createSlice({
    name: 'houses',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHouses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchHouses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default housesSlice.reducer;
