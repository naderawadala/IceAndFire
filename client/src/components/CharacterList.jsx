import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setCurrentPage } from '../redux/charactersSlice/charactersSlice';

const CharacterList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const characters = useSelector((state) => state.characters.items) || [];
    const characterStatus = useSelector((state) => state.characters.status);
    const error = useSelector((state) => state.characters.error);
    const currentPage = useSelector((state) => state.characters.currentPage);
    const charactersPerPage = useSelector((state) => state.characters.charactersPerPage);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (characterStatus === 'idle') {
            dispatch(fetchCharacters());
        }
    }, [characterStatus, dispatch]);


    useEffect(() => {
        if (searchTerm) {
            dispatch(setCurrentPage(1));
        }
    }, [searchTerm, dispatch]);

    if (characterStatus === 'loading') {
        return <p>Loading characters...</p>;
    }

    if (characterStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    const filteredCharacters = characters.filter((character) => {
        const searchTermLower = searchTerm.toLowerCase();
        const characterName = character.name.toLowerCase();
        return characterName.includes(searchTermLower);
    });

    const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
    const startIndex = (currentPage - 1) * charactersPerPage;
    const currentCharacters = filteredCharacters.slice(startIndex, startIndex + charactersPerPage);

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
                        <h2 className="mb-0">CHARACTERS</h2>
                    </Col>

                    <Col xs={12} md={4} className="d-flex justify-content-center">
                        <InputGroup style={{ width: '300px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Search characters by name..."
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
                            title="Create Character"
                            onClick={() => navigate('/characters/new')}
                            className="btn-lg"
                        >
                            <i className="bi bi-plus"></i>
                        </Button>
                    </Col>
                </Row>

                <Row className="g-4">
                    {currentCharacters.length > 0 ? (
                        currentCharacters.map((character) => (
                            <Col xs={12} md={4} key={character.name}>
                                <Card className="mb-4 shadow-sm border-light">
                                    <Card.Body>
                                        <Card.Title>{character.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {character.founder ? `Founder: ${character.founder}` : 'Founder Unknown'}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <strong>Region:</strong> {character.region || 'Unknown'} <br />
                                            <strong>Titles:</strong> {character.titles ? character.titles.join(", ") : 'Unknown'} <br />
                                            <strong>Born:</strong> {character.born ? character.born : 'Unknown'} <br />
                                            <strong>Words:</strong> {character.words || 'No words known'}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/characters/${character.name}`)}
                                        >
                                            Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No characters found.</p>
                    )}
                </Row>
                
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Button
                            variant="secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || totalPages === 0}
                        >
                            Previous
                        </Button>
                        <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                        <Button
                            variant="secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CharacterList;
