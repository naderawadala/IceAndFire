import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HouseList = () => {
    const navigate = useNavigate();

    const houses = [
        { id: 1, name: "House Stark", description: "The noble house of Winterfell." },
        { id: 2, name: "House Lannister", description: "The wealthy house from Casterly Rock." },
        { id: 3, name: "House Targaryen", description: "The house known for their dragons." },
    ];

    return (
        <section className="mt-5">
            <h2>HOUSES</h2>
            <Row>
                {houses.map((house) => (
                    <Col xs={12} md={4} key={house.id}>
                        <Card className="mb-4" onClick={() => navigate(`/houses/${house.id}`)}>
                            <Card.Body>
                                <Card.Title>{house.name}</Card.Title>
                                <Card.Text>{house.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default HouseList;
