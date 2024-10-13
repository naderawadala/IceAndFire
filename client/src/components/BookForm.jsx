import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBookByName,
    createBook,
    updateBook,
    clearBook,
} from '../redux/booksSlice';

const BookForm = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { book, status, error } = useSelector((state) => state.books);

    const isEditMode = !!name;

    const [bookData, setBookData] = React.useState({
        name: '',
        isbn: '',
        authors: '',
        numberOfPages: '',
        publisher: '',
        country: '',
        mediaType: '',
        released: '',
        characters: '', // Assuming characters and povCharacters are to be included
        povCharacters: '',
    });

    useEffect(() => {
        if (isEditMode) {
            // Check if book data is passed via location state
            if (location.state) {
                const bookFromState = location.state;
                setBookData({
                    ...bookFromState,
                    authors: bookFromState.authors.join(", "),
                    released: new Date(bookFromState.released).toISOString().substring(0, 10),
                    characters: bookFromState.characters.join(", "),
                    povCharacters: bookFromState.povCharacters.join(", "),
                });
            } else {
                // Fetch book details from the Redux store
                dispatch(fetchBookByName(name));
            }
        }

        // Clear book state when component unmounts
        return () => {
            dispatch(clearBook());
        };
    }, [name, isEditMode, location.state, dispatch]);

    useEffect(() => {
        if (book) {
            setBookData({
                ...book,
                authors: book.authors.join(", "),
                released: new Date(book.released).toISOString().substring(0, 10),
                characters: book.characters.join(", "), // Add characters
                povCharacters: book.povCharacters.join(", "), // Add POV characters
            });
        }
    }, [book]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...bookData,
            authors: bookData.authors.split(",").map(author => author.trim()),
            characters: bookData.characters.split(",").map(character => character.trim()),
            povCharacters: bookData.povCharacters.split(",").map(povCharacter => povCharacter.trim()),
            released: new Date(bookData.released).toISOString(),
        };
        
        console.log('Payload to be sent:', payload);

        if (isEditMode) {
            await dispatch(updateBook({ isbn: book.isbn, bookDto: payload }));
        } else {
            await dispatch(createBook(payload));
        }

        // Navigate to home after creating or updating a book
        if (!error) {
            navigate('/');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });
    };

    if (status === 'loading') {
        return <Spinner animation="border" />;
    }

    return (
        <div className="mt-5 container" style={{ maxWidth: '800px' }}>
            <h2>{isEditMode ? 'Update Book' : 'Create Book'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={bookData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formIsbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        type="text"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAuthors">
                    <Form.Label>Authors (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        name="authors"
                        value={bookData.authors}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formNumberOfPages">
                    <Form.Label>Number of Pages</Form.Label>
                    <Form.Control
                        type="number"
                        name="numberOfPages"
                        value={bookData.numberOfPages}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPublisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control
                        type="text"
                        name="publisher"
                        value={bookData.publisher}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        value={bookData.country}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formMediaType">
                    <Form.Label>Media Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="mediaType"
                        value={bookData.mediaType}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formReleased">
                    <Form.Label>Released Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="released"
                        value={bookData.released}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCharacters">
                    <Form.Label>Characters (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        name="characters"
                        value={bookData.characters}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPovCharacters">
                    <Form.Label>POV Characters (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        name="povCharacters"
                        value={bookData.povCharacters}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    {isEditMode ? 'Update Book' : 'Create Book'}
                </Button>
            </Form>
        </div>
    );
};

export default BookForm;
