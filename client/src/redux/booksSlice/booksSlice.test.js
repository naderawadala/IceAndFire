import { configureStore } from '@reduxjs/toolkit';
import booksReducer, {
    fetchBooks,
    fetchBookByName,
    createBook,
    updateBook,
    deleteBook,
    clearBook,
    setCurrentPage,
} from './booksSlice';

describe('booksSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                books: booksReducer,
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
            book: null,
            currentPage: 1,
            booksPerPage: 6,
        };
        expect(store.getState().books).toEqual(initialState);
    });

    it('should handle setCurrentPage', () => {
        store.dispatch(setCurrentPage(2));
        expect(store.getState().books.currentPage).toEqual(2);
    });

    it('should handle clearBook', () => {
        store.dispatch(clearBook());
        expect(store.getState().books.book).toBeNull();
    });

    it('should handle fetchBooks', async () => {
        const mockBooks = [
            {
                name: 'Book One',
                isbn: '1234567890',
                url: 'http://example.com/book-one',
                authors: ['Author One'],
                numberOfPages: 200,
                publisher: 'Publisher One',
                country: 'Country One',
                mediaType: 'ebook',
                released: '2024-01-01',
                characters: ['Character One'],
                povCharacters: ['POV Character One'],
            },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { books: mockBooks } }),
            })
        );

        await store.dispatch(fetchBooks());

        const state = store.getState().books;
        expect(state.items).toEqual(mockBooks);
    });

    it('should handle fetchBookByName', async () => {
        const mockBook = {
            name: 'Book One',
            isbn: '1234567890',
            url: 'http://example.com/book-one',
            authors: ['Author One'],
            numberOfPages: 200,
            publisher: 'Publisher One',
            country: 'Country One',
            mediaType: 'ebook',
            released: '2024-01-01',
            characters: ['Character One'],
            povCharacters: ['POV Character One'],
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { bookByName: mockBook } }),
            })
        );

        await store.dispatch(fetchBookByName('Book One'));

        const state = store.getState().books;
        expect(state.status).toEqual('succeeded');
        expect(state.book).toEqual(mockBook);
    });

    it('should handle createBook', async () => {
        const newBook = {
            name: 'Book Two',
            isbn: '0987654321',
            authors: ['Author Two'],
            numberOfPages: 300,
            publisher: 'Publisher Two',
            country: 'Country Two',
            mediaType: 'ebook',
            released: '2024-01-02',
            characters: ['Character Two'],
            povCharacters: ['POV Character Two'],
        };

        const mockCreatedBook = { ...newBook };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { createBook: mockCreatedBook } }),
            })
        );

        await store.dispatch(createBook(newBook));

        const state = store.getState().books;
        expect(state.items).toContainEqual(mockCreatedBook);
    });

    it('should handle updateBook', async () => {
        const existingBook = {
            name: 'Book One',
            isbn: '1234567890',
            authors: ['Author One'],
            numberOfPages: 200,
            publisher: 'Publisher One',
            country: 'Country One',
            mediaType: 'ebook',
            released: '2024-01-01',
            characters: ['Character One'],
            povCharacters: ['POV Character One'],
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { books: [existingBook] } }),
            })
        );

        await store.dispatch(fetchBooks());

        const updatedBook = { ...existingBook, authors: ['Updated Author'] };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { updateBook: updatedBook } }),
            })
        );

        await store.dispatch(updateBook({ isbn: existingBook.isbn, bookData: updatedBook }));

        const state = store.getState().books;
        expect(state.items).toContainEqual(updatedBook);
    });

    it('should handle deleteBook', async () => {
        const mockBooks = [
            {
                name: 'Book One',
                isbn: '1234567890',
                authors: ['Author One'],
                numberOfPages: 200,
                publisher: 'Publisher One',
                country: 'Country One',
                mediaType: 'ebook',
                released: '2024-01-01',
                characters: ['Character One'],
                povCharacters: ['POV Character One'],
            },
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { books: mockBooks } }),
            })
        );

        await store.dispatch(fetchBooks());

        const isbnToDelete = '1234567890';

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: jest.fn().mockResolvedValue({ data: { deleteBook: true } }),
            })
        );

        await store.dispatch(deleteBook(isbnToDelete));

        const state = store.getState().books;
        expect(state.items).not.toContainEqual(expect.objectContaining({ isbn: isbnToDelete }));
    });
});
