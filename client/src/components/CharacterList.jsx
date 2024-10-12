import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CharacterList = () => {
    const navigate = useNavigate();

    const characters = [
        { id: 1, name: "Jon Snow", description: "The illegitimate son of Eddard Stark." },
        { id: 2, name: "Daenerys Targaryen", description: "The last Targaryen." },
        { id: 3, name: "Tyrion Lannister", description: "The witty member of House Lannister." },
    ];

    return (
        <section className="mt-5">
            <h2>CHARACTERS</h2>
            <Row>
                {characters.map((character) => (
                    <Col xs={12} md={4} key={character.id}>
                        <Card className="mb-4" onClick={() => navigate(`/characters/${character.id}`)}>
                            <Card.Body>
                                <Card.Title>{character.name}</Card.Title>
                                <Card.Text>{character.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default CharacterList;
