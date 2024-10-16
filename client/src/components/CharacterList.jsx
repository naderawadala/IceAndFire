import React, { useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../redux/charactersSlice';

const CharacterList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const characters = useSelector((state) => state.characters.items) || []; // Fallback to empty array
    const characterStatus = useSelector((state) => state.characters.status);
    const error = useSelector((state) => state.characters.error);

    useEffect(() => {
        if (characterStatus === 'idle') {
            dispatch(fetchCharacters());
        }
    }, [characterStatus, dispatch]);

    // Handle loading and error states
    if (characterStatus === 'loading') {
        return <p>Loading characters...</p>;
    }

    if (characterStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="mt-5">
            <h2>CHARACTERS</h2>
            <Button 
                variant="success" 
                className="mb-3" 
                onClick={() => navigate('/characters/new')}
            >
                Create Character
            </Button>
            <Row>
                {characters.map((character) => (
                    <Col xs={12} md={4} key={character.name}>
                        <Card className="mb-4 shadow-sm border-light">
                            <Card.Body>
                                <Card.Title>{character.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {character.titles.length > 0 ? `Titles: ${character.titles.join(", ")}` : 'No Titles'}
                                </Card.Subtitle>
                                <Card.Text className="mt-3">
                                    <strong>Culture:</strong> {character.culture || 'Unknown'} <br />
                                    <strong>Born:</strong> {character.born || 'Unknown'} <br />
                                    <strong>Died:</strong> {character.died || 'Unknown'}
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={() => navigate(`/characters/${character.id}`)}
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

export default CharacterList;
