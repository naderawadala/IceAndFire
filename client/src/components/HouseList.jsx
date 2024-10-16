import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHouses, setCurrentPage } from '../redux/housesSlice/housesSlice';

const HouseList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const houses = useSelector((state) => state.houses.items) || [];
    const houseStatus = useSelector((state) => state.houses.status);
    const error = useSelector((state) => state.houses.error);
    const currentPage = useSelector((state) => state.houses.currentPage);
    const housesPerPage = useSelector((state) => state.houses.housesPerPage);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (houseStatus === 'idle') {
            dispatch(fetchHouses());
        }
    }, [houseStatus, dispatch]);

    useEffect(() => {
        if (searchTerm) {
            dispatch(setCurrentPage(1));
        }
    }, [searchTerm, dispatch]);

    if (houseStatus === 'loading') {
        return <p>Loading houses...</p>;
    }

    if (houseStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    const filteredHouses = houses.filter((house) => {
        const searchTermLower = searchTerm.toLowerCase();
        const houseName = house.name.toLowerCase();
        return houseName.includes(searchTermLower);
    });

    const totalCount = filteredHouses.length; 
    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);
    const totalPages = Math.ceil(totalCount / housesPerPage) || 1;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
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
                        <h2 className="mb-0">HOUSES</h2>
                    </Col>

                    <Col xs={12} md={4} className="d-flex justify-content-center">
                        <InputGroup style={{ width: '300px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Search houses by name..."
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
                            title="Create House" 
                            onClick={() => navigate('/houses/new')}
                            className="btn-lg"
                        >
                            <i className="bi bi-plus"></i>
                        </Button>
                    </Col>
                </Row>

                <Row className="g-4">
                    {currentHouses.length > 0 ? (
                        currentHouses.map((house) => (
                            <Col xs={12} md={4} key={house.name}>
                                <Card className="mb-4 shadow-sm border-light">
                                    <Card.Body>
                                        <Card.Title>{house.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {house.founder ? `Founder: ${house.founder}` : 'Founder Unknown'}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <strong>Region:</strong> {house.region || 'Unknown'} <br />
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
                        ))
                    ) : (
                        <p>No houses found.</p>
                    )}
                </Row>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1 || totalCount === 0}>
                        Previous
                    </Button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages || totalCount === 0}>
                        Next
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default HouseList;
