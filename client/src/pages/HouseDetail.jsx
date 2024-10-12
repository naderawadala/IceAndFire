// src/pages/HouseDetail.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const HouseDetail = ({ name, motto, sigil, description }) => {
    return (
        <Container className="my-4">
            <h1>{name}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Details</Card.Title>
                    <Card.Text>
                        <strong>Motto:</strong> {motto}
                    </Card.Text>
                    <Card.Text>
                        <strong>Sigil:</strong> {sigil}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default HouseDetail;
