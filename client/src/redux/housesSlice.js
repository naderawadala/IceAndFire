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

// Fetch a house by name
export const fetchHouseByName = createAsyncThunk('houses/fetchHouseByName', async (name) => {
    console.log(name)
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
              houseByName(name: "${name}") {
                ancestralWeapons
                cadetBranches
                coatOfArms
                currentLord
                diedOut
                founded
                founder
                heir
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
    console.log(data);
    return data.data.houseByName;
});

// Create a new house
export const createHouse = createAsyncThunk('houses/createHouse', async (newHouse) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation {
              createHouse(houseDto: {
                ancestralWeapons: ${JSON.stringify(newHouse.ancestralWeapons)},
                cadetBranches: ${JSON.stringify(newHouse.cadetBranches)},
                coatOfArms: "${newHouse.coatOfArms}",
                currentLord: "${newHouse.currentLord}",
                diedOut: "${newHouse.diedOut}",
                founded: "${newHouse.founded}",
                founder: "${newHouse.founder}",
                heir: "${newHouse.heir}",
                name: "${newHouse.name}",
                overlord: "${newHouse.overlord}",
                region: "${newHouse.region}",
                seats: ${JSON.stringify(newHouse.seats)},
                swornMembers: ${JSON.stringify(newHouse.swornMembers)},
                titles: ${JSON.stringify(newHouse.titles)},
                words: "${newHouse.words}"
              }) {
                ancestralWeapons
                cadetBranches
                coatOfArms
                currentLord
                diedOut
                founded
                founder
                heir
                name
                overlord
                region
                seats
                swornMembers
                titles
                words
              }
            }`,
        }),
    });
    const data = await response.json();
    return data.data.createHouse;
});

// Update an existing house
export const updateHouse = createAsyncThunk('houses/updateHouse', async ({ name, updatedHouse }) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation {
              updateHouse(name: "${name}", houseDto: {
                name: "${updatedHouse.name}"
                ancestralWeapons: ${JSON.stringify(updatedHouse.ancestralWeapons)},
                cadetBranches: ${JSON.stringify(updatedHouse.cadetBranches)},
                coatOfArms: "${updatedHouse.coatOfArms}",
                currentLord: "${updatedHouse.currentLord}",
                diedOut: "${updatedHouse.diedOut}",
                founded: "${updatedHouse.founded}",
                founder: "${updatedHouse.founder}",
                heir: "${updatedHouse.heir}",
                overlord: "${updatedHouse.overlord}",
                region: "${updatedHouse.region}",
                seats: ${JSON.stringify(updatedHouse.seats)},
                swornMembers: ${JSON.stringify(updatedHouse.swornMembers)},
                titles: ${JSON.stringify(updatedHouse.titles)},
                words: "${updatedHouse.words}"
              }) {
                ancestralWeapons
                cadetBranches
                coatOfArms
                currentLord
                diedOut
                founded
                founder
                heir
                name
                overlord
                region
                seats
                swornMembers
                titles
                words
              }
            }`,
        }),
    });
    const data = await response.json();
    return data.data.updateHouse;
});

// Delete a house
export const deleteHouse = createAsyncThunk('houses/deleteHouse', async (name) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation {
              deleteHouse(name: "${name}") {
              }
            }`,
        }),
    });
    const data = await response.json();
    return name; // Return the ID of the deleted house
});

const housesSlice = createSlice({
    name: 'houses',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearHouse(state) {
            state.house = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch houses
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
            })
            
            // Fetch house by name
            .addCase(fetchHouseByName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHouseByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.house = action.payload; // Store the fetched house
            })
            .addCase(fetchHouseByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Update house
            .addCase(updateHouse.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateHouse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedHouse = action.payload;
                const existingHouseIndex = state.items.findIndex(house => house.name === updatedHouse.name);
                if (existingHouseIndex >= 0) {
                    state.items[existingHouseIndex] = updatedHouse;
                }
            })
            .addCase(updateHouse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Delete house
            .addCase(deleteHouse.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteHouse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(house => house.name !== action.payload);
            })
            .addCase(deleteHouse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearHouse } = housesSlice.actions;

export default housesSlice.reducer;
