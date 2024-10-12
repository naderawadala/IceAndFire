import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const navigate = useNavigate();

    const books = [
        { id: 1, title: "A Game of Thrones", description: "The first book in the series." },
        { id: 2, title: "A Clash of Kings", description: "The second book in the series." },
        { id: 3, title: "A Storm of Swords", description: "The third book in the series." },
    ];

    return (
        <section className="mt-5">
            <h2>BOOKS</h2>
            <Row>
                {books.map((book) => (
                    <Col xs={12} md={4} key={book.id}>
                        <Card className="mb-4" onClick={() => navigate(`/books/${book.id}`)}>
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{book.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default BookList;
