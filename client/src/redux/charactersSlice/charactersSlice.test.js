import { configureStore } from '@reduxjs/toolkit';
import charactersReducer, {
    fetchCharacters,
    fetchCharacterByName,
    setCurrentPage,
    clearCharacter,
} from './charactersSlice';

describe('charactersSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                characters: charactersReducer,
            },
        });

        // Mock global fetch
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initial state', () => {
        it('should return the initial state', () => {
            const initialState = {
                character: null,
                items: [],
                status: 'idle',
                error: null,
                currentPage: 1,
                charactersPerPage: 10,
            };
            expect(store.getState().characters).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle setCurrentPage', () => {
            store.dispatch(setCurrentPage(2));
            expect(store.getState().characters.currentPage).toEqual(2);
        });

        it('should handle clearCharacter', () => {
            store.dispatch(clearCharacter());
            expect(store.getState().characters.character).toBeNull();
        });
    });

    describe('async thunks', () => {
        const mockCharacters = [
            {
                name: 'Character 1',
                id: 1,
                // Add other fields as necessary
            },
            {
                name: 'Character 2',
                id: 2,
                // Add other fields as necessary
            },
        ];

        it('should handle fetchCharacters', async () => {
            // Mock fetch response
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    data: { characters: mockCharacters },
                }),
            });

            // Dispatch the thunk
            await store.dispatch(fetchCharacters());

            const state = store.getState().characters;
            expect(state.status).toEqual('succeeded');
            expect(state.items).toEqual(mockCharacters);
        });

        it('should handle fetchCharacters error', async () => {
            const errorMessage = 'Failed to fetch';
            fetch.mockRejectedValueOnce(new Error(errorMessage));

            // Dispatch the thunk
            await store.dispatch(fetchCharacters());

            const state = store.getState().characters;
            expect(state.status).toEqual('failed');
            expect(state.error).toEqual(errorMessage);
        });

        it('should handle fetchCharacterByName', async () => {
            const characterName = 'Character 1';
            const mockCharacter = {
                name: characterName,
                id: 1,
                // Add other fields as necessary
            };

            // Mock fetch response
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    data: { characterByName: mockCharacter },
                }),
            });

            // Dispatch the thunk
            await store.dispatch(fetchCharacterByName(characterName));

            const state = store.getState().characters;
            expect(state.status).toEqual('succeeded');
            expect(state.character).toEqual(mockCharacter);
        });

        it('should handle fetchCharacterByName error', async () => {
            const errorMessage = 'Character not found';
            const characterName = 'Unknown Character';
            fetch.mockRejectedValueOnce(new Error(errorMessage));

            // Dispatch the thunk
            await store.dispatch(fetchCharacterByName(characterName));

            const state = store.getState().characters;
            expect(state.status).toEqual('failed');
            expect(state.error).toEqual(errorMessage);
        });
    });
});
