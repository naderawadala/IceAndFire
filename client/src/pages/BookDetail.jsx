// src/pages/BookDetail.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const BookDetail = ({ title, author, releaseDate, description }) => {
    return (
        <Container className="my-4">
            <h1>{title}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Details</Card.Title>
                    <Card.Text>
                        <strong>Author:</strong> {author}
                    </Card.Text>
                    <Card.Text>
                        <strong>Release Date:</strong> {releaseDate}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BookDetail;
