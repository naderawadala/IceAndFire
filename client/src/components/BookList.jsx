import React, { useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';

const BookList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.items);
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
            <h2>BOOKS</h2>
            <Row>
                {books.map((book) => (
                    <Col xs={12} md={4} key={book.isbn}>
                        <Card className="mb-4 shadow-sm border-light">
                            <Card.Body>
                                <Card.Title>{book.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {book.authors.length > 1 ? "Authors: " : "Author: "}
                                    {book.authors.join(", ")}
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
