import { configureStore } from '@reduxjs/toolkit';
import housesReducer, { 
    fetchHouses, 
    fetchHouseByName, 
    createHouse, 
    updateHouse, 
    deleteHouse 
} from './housesSlice';

describe('housesSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                houses: housesReducer,
            },
        });

        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle fetchHouses', async () => {
        const mockHouses = [
            {
                ancestralWeapons: ['Sword of Ice'],
                cadetBranches: [],
                coatOfArms: 'A grey direwolf on a white field',
                currentLord: 'Eddard Stark',
                diedOut: false,
                founded: 'Age of Heroes',
                founder: 'Brandon Stark',
                heir: 'Robb Stark',
                name: 'House Stark',
                overlord: null,
                region: 'The North',
                seats: ['Winterfell'],
                swornMembers: [],
                titles: ['Warden of the North'],
                url: 'http://localhost:5000/houses/stark',
                words: 'Winter is Coming'
            },
        ];

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                data: { houses: mockHouses },
            }),
        });

        await store.dispatch(fetchHouses());

        const state = store.getState().houses;

        expect(state.status).toEqual('succeeded');
        expect(state.items).toEqual(mockHouses);
    });

    it('should handle fetchHouseByName', async () => {
        const mockHouse = {
            ancestralWeapons: ['Sword of Ice'],
            cadetBranches: [],
            coatOfArms: 'A grey direwolf on a white field',
            currentLord: 'Eddard Stark',
            diedOut: false,
            founded: 'Age of Heroes',
            founder: 'Brandon Stark',
            heir: 'Robb Stark',
            name: 'House Stark',
            overlord: null,
            region: 'The North',
            seats: ['Winterfell'],
            swornMembers: [],
            titles: ['Warden of the North'],
            url: 'http://localhost:5000/houses/stark',
            words: 'Winter is Coming'
        };

        const houseName = 'House Stark';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                data: { houseByName: mockHouse },
            }),
        });

        await store.dispatch(fetchHouseByName(houseName));

        const state = store.getState().houses;

        expect(state.house).toEqual(mockHouse);
    });

    

    it('should handle deleteHouse', async () => {
        const existingHouse = {
            ancestralWeapons: ['Sword of Ice'],
            cadetBranches: [],
            coatOfArms: 'A grey direwolf on a white field',
            currentLord: 'Eddard Stark',
            diedOut: false,
            founded: 'Age of Heroes',
            founder: 'Brandon Stark',
            heir: 'Robb Stark',
            name: 'House Stark',
            overlord: null,
            region: 'The North',
            seats: ['Winterfell'],
            swornMembers: [],
            titles: ['Warden of the North'],
            words: 'Winter is Coming'
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                data: { deleteHouse: true },
            }),
        });

        await store.dispatch(createHouse(existingHouse));

        await store.dispatch(deleteHouse('House Stark'));

        const state = store.getState().houses;

        expect(state.items).not.toContainEqual(existingHouse);
    });
});
