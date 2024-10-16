import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setCurrentPage } from '../redux/booksSlice/booksSlice';

const BookList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.items) || [];
    const bookStatus = useSelector((state) => state.books.status);
    const error = useSelector((state) => state.books.error);
    const currentPage = useSelector((state) => state.books.currentPage);
    const booksPerPage = useSelector((state) => state.books.booksPerPage);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    useEffect(() => {
        if (searchTerm) {
            dispatch(setCurrentPage(1));
        }
    }, [searchTerm, dispatch]);

    if (bookStatus === 'loading') {
        return <p>Loading books...</p>;
    }

    if (bookStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    const filteredBooks = books.filter((book) => {
        const searchTermLower = searchTerm.toLowerCase();
        const bookName = book.name.toLowerCase();
        const bookAuthors = book.authors ? book.authors.join(', ').toLowerCase() : '';
        return bookName.includes(searchTermLower) || bookAuthors.includes(searchTermLower);
    });


    const totalCount = filteredBooks.length; 
    const totalPages = Math.ceil(totalCount / booksPerPage); 
    const startIndex = (currentPage - 1) * booksPerPage; 
    const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch(setCurrentPage(page));
        }
    };

    return (
        <section className="mt-5">
            <Container>
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/')}
                    className="mb-4"
                    title="Return to Home"
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                    <i className="bi bi-arrow-left me-2"></i> Go Back
                </Button>

                <Row className="align-items-center mb-3">
                    <Col xs={12} md={4} className="d-flex align-items-center">
                        <h2 className="mb-0">BOOKS</h2>
                    </Col>

                    <Col xs={12} md={4} className="d-flex justify-content-center">
                        <InputGroup style={{ width: '300px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Search books by name or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ height: '36px' }}
                            />
                            <Button variant="outline-secondary" disabled>
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={4} className="text-md-end">
                        <Button
                            variant="success"
                            title="Create Book"
                            onClick={() => navigate('/books/new')}
                            className="btn-lg"
                        >
                            <i className="bi bi-plus"></i>
                        </Button>
                    </Col>
                </Row>

                <Row className="g-4">
                    {currentBooks.length > 0 ? (
                        currentBooks.map((book) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={book.isbn}>
                                <Card className="shadow-sm border-light h-100">
                                    <Card.Body className="d-flex flex-column">
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
                                            className="mt-auto"
                                        >
                                            Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No books found.</p>
                    )}
                </Row>

                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Button
                            variant="secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || totalCount === 0}
                        >
                            Previous
                        </Button>
                        <span className="mx-2">{`Page ${currentPage} of ${totalPages || 1}`}</span>
                        <Button
                            variant="secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || totalCount === 0}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default BookList;
