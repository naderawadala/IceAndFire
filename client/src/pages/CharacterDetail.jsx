import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterById } from '../redux/charactersSlice'; // Import the fetch action

const CharacterDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select character and status from Redux store
    const character = useSelector((state) => state.characters.character);
    const loading = useSelector((state) => state.characters.status === 'loading');
    const error = useSelector((state) => state.characters.error);

    useEffect(() => {
        dispatch(fetchCharacterById(id)); // Fetch character details by id
    }, [dispatch, id]);

    // Handle loading and error states
    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!character) {
        return <p>No character found!</p>; // Handle case where no character is found
    }

    return (
        <Container className="my-4">
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
                        <strong>Siblings:</strong> {character.siblings.length > 0 ? character.siblings.join(", ") : 'No Siblings'}<br />
                        <strong>Allegiances:</strong> {character.allegiances.length > 0 ? character.allegiances.join(", ") : 'No Allegiances'}<br />
                        <strong>URL:</strong> <a href={character.url} target="_blank" rel="noopener noreferrer">{character.url}</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CharacterDetail;
