import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterByName } from '../redux/charactersSlice/charactersSlice';

const CharacterDetail = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const character = useSelector((state) => state.characters.character);
    const loading = useSelector((state) => state.characters.status === 'loading');
    const error = useSelector((state) => state.characters.error);

    useEffect(() => {
        dispatch(fetchCharacterByName(name));
    }, [dispatch, name]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!character) {
        return <p>No character found!</p>;
    }

    return (
        <Container className="my-4">
            <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/characters')} 
                className="mb-4" 
                style={{ padding: '0.375rem 1rem' }}
            >
                <i className="bi bi-arrow-left"></i> Go Back
            </Button>
            <h1>{character.name}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Details</Card.Title>
                    <Card.Text>
                        <strong>Gender:</strong> {character.gender || 'Unknown'}<br />
                        <strong>Culture:</strong> {character.culture || 'Unknown'}<br />
                        <strong>Born:</strong> {character.born || 'Unknown'}<br />
                        <strong>Died:</strong> {character.died || 'Unknown'}<br />
                        <strong>Titles:</strong> {character.titles.length > 0 ? character.titles.join(", ") : 'No Titles'}<br />
                        <strong>Aliases:</strong> {character.aliases.length > 0 ? character.aliases.join(", ") : 'No Aliases'}<br />
                        <strong>Father:</strong> {character.father || 'Unknown'}<br />
                        <strong>Mother:</strong> {character.mother || 'Unknown'}<br />
                        <strong>Spouse:</strong> {character.spouse || 'Unknown'}<br />
                        <strong>Allegiances:</strong> {character.allegiances.length > 0 ? character.allegiances.join(", ") : 'No Allegiances'}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CharacterDetail;
