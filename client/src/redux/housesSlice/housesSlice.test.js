// housesSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import housesReducer, {
    fetchHouses,
    fetchHouseByName,
    createHouse,
    updateHouse,
    deleteHouse,
    setCurrentPage,
    clearHouse,
} from './housesSlice';

describe('housesSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                houses: housesReducer,
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle initial state', () => {
        const initialState = {
            items: [],
            status: 'idle',
            error: null,
            currentPage: 1,
            housesPerPage: 6,
        };
        expect(store.getState().houses).toEqual(initialState);
    });

    it('should handle setCurrentPage', () => {
        store.dispatch(setCurrentPage(2));
        expect(store.getState().houses.currentPage).toEqual(2);
    });

    it('should handle clearHouse', () => {
        store.dispatch(clearHouse());
        expect(store.getState().houses.house).toBeNull();
    });

    it('should handle fetchHouses', async () => {
        const mockHouses = [
            { name: 'House Stark', region: 'The North' },
            { name: 'House Lannister', region: 'The Westerlands' },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { houses: mockHouses } }),
            })
        );

        await store.dispatch(fetchHouses());

        const state = store.getState().houses;
        expect(state.status).toEqual('succeeded');
        expect(state.items).toEqual(mockHouses);
    });

    it('should handle createHouse', async () => {
        const newHouse = {
            name: 'House Targaryen',
            region: 'Essos',
            ancestralWeapons: [],
            cadetBranches: [],
            coatOfArms: '',
            currentLord: '',
            diedOut: '',
            founded: '',
            founder: '',
            heir: '',
            overlord: '',
            seats: [],
            swornMembers: [],
            titles: [],
            words: '',
        };

        const mockCreatedHouse = { ...newHouse, id: '1' };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { createHouse: mockCreatedHouse } }),
            })
        );

        await store.dispatch(createHouse(newHouse)); // Await the dispatch here

        const state = store.getState().houses;
        expect(state.status).toEqual('succeeded'); // Ensure status is 'succeeded'
        expect(state.items).toContainEqual(mockCreatedHouse); // Check if the house was added
    });

    it('should handle updateHouse', async () => {
        const existingHouse = {
            name: 'House Stark',
            region: 'The North',
        };

        const updatedHouse = { ...existingHouse, region: 'The North (Updated)' };

        // First, populate the store with an existing house
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { houses: [existingHouse] } }),
            })
        );

        await store.dispatch(fetchHouses()); // Fetch houses first to ensure items are populated

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { updateHouse: updatedHouse } }),
            })
        );

        await store.dispatch(updateHouse({ name: existingHouse.name, updatedHouse })); // Await dispatch

        const state = store.getState().houses;
        expect(state.status).toEqual('succeeded');
        expect(state.items).toContainEqual(updatedHouse); // Verify the updated house exists
    });

    it('should handle deleteHouse', async () => {
        const houseName = 'House Stark';
        
        const mockHouses = [{ name: houseName, region: 'The North' }];
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { houses: mockHouses } }),
            })
        );

        await store.dispatch(fetchHouses());

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { deleteHouse: {} } }),
            })
        );

        await store.dispatch(deleteHouse(houseName));

        const state = store.getState().houses;
        expect(state.status).toEqual('succeeded');
        expect(state.items).not.toContainEqual(expect.objectContaining({ name: houseName }));
    });
});
