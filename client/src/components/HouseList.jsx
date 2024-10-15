import React, { useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHouses } from '../redux/housesSlice';

const HouseList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const houses = useSelector((state) => state.houses.items) || []; // Fallback to empty array
    const houseStatus = useSelector((state) => state.houses.status);
    const error = useSelector((state) => state.houses.error);

    useEffect(() => {
        if (houseStatus === 'idle') {
            dispatch(fetchHouses());
        }
    }, [houseStatus, dispatch]);

    // Handle loading and error states
    if (houseStatus === 'loading') {
        return <p>Loading houses...</p>;
    }

    if (houseStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="mt-5">
            <h2>HOUSES</h2>
            <Button 
                variant="success" 
                className="mb-3" 
                onClick={() => navigate('/houses/new')}
            >
                Create House
            </Button>
            <Row>
                {houses.map((house) => (
                    <Col xs={12} md={4} key={house.id}>
                        <Card className="mb-4 shadow-sm border-light">
                            <Card.Body>
                                <Card.Title>{house.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {house.founder ? `Founder: ${house.founder}` : 'Founder Unknown'} <br />
                                    {house.currentLord ? `Current Lord: ${house.currentLord}` : 'No Current Lord'}
                                </Card.Subtitle>
                                <Card.Text className="mt-3">
                                    <strong>Region:</strong> {house.region} <br />
                                    <strong>Seats:</strong> {house.seats ? house.seats.join(", ") : 'Unknown'} <br />
                                    <strong>Founded:</strong> {house.founded ? house.founded : 'Unknown'} <br />
                                    <strong>Words:</strong> {house.words || 'No words known'}
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={() => navigate(`/houses/${house.name}`)}
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

export default HouseList;
