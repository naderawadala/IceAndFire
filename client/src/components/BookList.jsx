import React, { useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';

const BookList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.items) || []; // Fallback to empty array
    const bookStatus = useSelector((state) => state.books.status);
    const error = useSelector((state) => state.books.error);

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    // Handle loading and error states
    if (bookStatus === 'loading') {
        return <p>Loading books...</p>;
    }

    if (bookStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="mt-5">
            {/* Go Back Button */}
            <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/')}
                className="mb-4" 
                title="Return to Home"
                style={{ display: 'inline-flex', alignItems: 'center' }}
            >
                <i className="bi bi-arrow-left me-2"></i> Go Back
            </Button>

            {/* Books Header and Create Book Button */}
            <div className="d-flex align-items-center mb-3">
                <h2 className="mb-0 me-2">BOOKS</h2>
                <Button 
                    variant="success" 
                    title="Create Book" 
                    onClick={() => navigate('/books/new')}
                    className="btn-sm" // Make button smaller
                >
                    <i className="bi bi-plus"></i>
                </Button>
            </div>

            {/* Books List */}
            <Row>
                {books.map((book) => (
                    <Col xs={12} md={4} key={book.isbn}>
                        <Card className="mb-4 shadow-sm border-light">
                            <Card.Body>
                                <Card.Title>{book.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {Array.isArray(book.authors) && book.authors.length > 1 ? "Authors: " : "Author: "}
                                    {Array.isArray(book.authors) ? book.authors.join(", ") : "Unknown Author"}
                                </Card.Subtitle>
                                <Card.Text className="mt-3">
                                    <strong>ISBN:</strong> {book.isbn} <br />
                                    <strong>Pages:</strong> {book.numberOfPages} <br />
                                    <strong>Released:</strong> {new Date(book.released).toLocaleDateString()} <br />
                                    <strong>Publisher:</strong> {book.publisher}
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={() => navigate(`/books/${book.name}`)}
                                >
                                    Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default BookList;
