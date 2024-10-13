import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchBookByName, createBook, updateBook, clearBook, fetchBooks } from '../redux/booksSlice';

import  bookValidationSchema from '../validation/bookValidationSchema';

const BookForm = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { book, status, error } = useSelector((state) => state.books);
    const isEditMode = !!name;

    const [initialFormData, setInitialFormData] = useState({
        name: '',
        isbn: '',
        authors: '',
        numberOfPages: '',
        publisher: '',
        country: '',
        mediaType: '',
        released: '',
        characters: '',
        povCharacters: '',
    });

    useEffect(() => {
        if (isEditMode) {
            if (location.state) {
                // If the book is passed from the previous location state
                const bookFromState = location.state;
                setInitialFormData({
                    name: bookFromState.name,
                    isbn: bookFromState.isbn,
                    authors: bookFromState.authors.join(', '),
                    numberOfPages: bookFromState.numberOfPages,
                    publisher: bookFromState.publisher,
                    country: bookFromState.country,
                    mediaType: bookFromState.mediaType,
                    released: new Date(bookFromState.released).toISOString().substring(0, 10),
                    characters: bookFromState.characters.join(', '),
                    povCharacters: bookFromState.povCharacters.join(', '),
                });
            } else {
                // Fetch book if not available in location state
                dispatch(fetchBookByName(name));
            }
        }

        return () => {
            dispatch(clearBook());
        };
    }, [name, isEditMode, location.state, dispatch]);

    useEffect(() => {
        if (book) {
            // If book is fetched from the Redux state
            setInitialFormData({
                name: book.name,
                isbn: book.isbn,
                authors: book.authors.join(', '),
                numberOfPages: book.numberOfPages,
                publisher: book.publisher,
                country: book.country,
                mediaType: book.mediaType,
                released: new Date(book.released).toISOString().substring(0, 10),
                characters: book.characters.join(', '),
                povCharacters: book.povCharacters.join(', '),
            });
        }
    }, [book]);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            ...values,
            // Ensure these are always arrays of strings
            authors: values.authors.split(',').map(author => author.trim()).filter(Boolean),
            characters: values.characters.split(',').map(character => character.trim()).filter(Boolean),
            povCharacters: values.povCharacters.split(',').map(povCharacter => povCharacter.trim()).filter(Boolean),
            released: new Date(values.released).toISOString(),
        };

        if (isEditMode) {
            console.log("reached dispatch update book?")
            console.log(payload)
            await dispatch(updateBook({ isbn: book.isbn, bookData: payload }));
        } else {
            await dispatch(createBook(payload));
        }

        if (!error) {
            dispatch(fetchBooks());
        
            resetForm();
            dispatch(clearBook());
            navigate('/books');
        }
        setSubmitting(false);
    };

    if (status === 'loading') {
        return <Spinner animation="border" />;
    }

    return (
        <div className="mt-5 container" style={{ maxWidth: '800px' }}>
            <h2>{isEditMode ? 'Update Book' : 'Create Book'}</h2>
            <Formik
                initialValues={initialFormData}
                validationSchema={bookValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formIsbn">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="text"
                                name="isbn"
                                value={values.isbn}
                                onChange={handleChange}
                                isInvalid={touched.isbn && errors.isbn}
                            />
                            <Form.Control.Feedback type="invalid">{errors.isbn}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAuthors">
                            <Form.Label>Authors (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="authors"
                                value={values.authors}
                                onChange={handleChange}
                                isInvalid={touched.authors && errors.authors}
                            />
                            <Form.Control.Feedback type="invalid">{errors.authors}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formNumberOfPages">
                            <Form.Label>Number of Pages</Form.Label>
                            <Form.Control
                                type="number"
                                name="numberOfPages"
                                value={values.numberOfPages}
                                onChange={handleChange}
                                isInvalid={touched.numberOfPages && errors.numberOfPages}
                            />
                            <Form.Control.Feedback type="invalid">{errors.numberOfPages}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPublisher">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisher"
                                value={values.publisher}
                                onChange={handleChange}
                                isInvalid={touched.publisher && errors.publisher}
                            />
                            <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                isInvalid={touched.country && errors.country}
                            />
                            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formMediaType">
                            <Form.Label>Media Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="mediaType"
                                value={values.mediaType}
                                onChange={handleChange}
                                isInvalid={touched.mediaType && errors.mediaType}
                            />
                            <Form.Control.Feedback type="invalid">{errors.mediaType}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formReleased">
                            <Form.Label>Released Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="released"
                                value={values.released}
                                onChange={handleChange}
                                isInvalid={touched.released && errors.released}
                            />
                            <Form.Control.Feedback type="invalid">{errors.released}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCharacters">
                            <Form.Label>Characters (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="characters"
                                value={values.characters}
                                onChange={handleChange}
                                isInvalid={touched.characters && errors.characters}
                            />
                            <Form.Control.Feedback type="invalid">{errors.characters}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPovCharacters">
                            <Form.Label>POV Characters (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="povCharacters"
                                value={values.povCharacters}
                                onChange={handleChange}
                                isInvalid={touched.povCharacters && errors.povCharacters}
                            />
                            <Form.Control.Feedback type="invalid">{errors.povCharacters}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4" disabled={isSubmitting}>
                            {isEditMode ? 'Update Book' : 'Create Book'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookForm;
