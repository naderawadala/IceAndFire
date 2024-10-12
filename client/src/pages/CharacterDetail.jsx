// src/pages/CharacterDetail.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const CharacterDetail = ({ name, title, house, description }) => {
    return (
        <Container className="my-4">
            <h1>{name}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Details</Card.Title>
                    <Card.Text>
                        <strong>Title:</strong> {title}
                    </Card.Text>
                    <Card.Text>
                        <strong>House:</strong> {house}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CharacterDetail;
