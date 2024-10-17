import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    return data.data.characters;
});

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
    return data.data.characterByName;
});


const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        character: null,
        items: [],
        status: 'idle',
        error: null,
        currentPage: 1,
        charactersPerPage: 9,
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        clearCharacter(state) {
            state.character = null;
        },
    },
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
            .addCase(fetchCharacterByName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacterByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.character = action.payload;
            })
            .addCase(fetchCharacterByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage, clearCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
