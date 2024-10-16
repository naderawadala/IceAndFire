import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice/booksSlice';
import { fetchCharacters } from '../redux/charactersSlice/charactersSlice';
import { fetchHouses } from '../redux/housesSlice/housesSlice';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const books = useSelector((state) => state.books.items.slice(0, 5)) || [];
    const characters = useSelector((state) => state.characters.items.slice(0, 5)) || [];
    const houses = useSelector((state) => state.houses.items.slice(0, 5)) || [];

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchCharacters());
        dispatch(fetchHouses());
    }, [dispatch]);

    return (
        <Container className="mt-4">
            <section className="mt-5">
                <h2>World of Ice and Fire</h2>
                <p>
                    Welcome to the World of Ice and Fire — a land of stark contrasts and intricate histories,
                    where noble houses vie for power and the fate of kingdoms hangs in the balance. From the icy
                    expanse of the North, where direwolves roam and the ancient Wall stands sentinel against the
                    encroaching darkness, to the sun-soaked lands of Dorne, each region is steeped in its own
                    unique culture and lore.
                </p>
                <p>
                    In this realm, dragons soar across the skies, and the whispers of old gods and new echo
                    through the hearts of its people. The Seven Kingdoms are a tapestry woven with tales of
                    betrayal, honor, and sacrifice, where knights and lords navigate the treacherous waters of
                    politics and war.
                </p>
                <p>
                    Discover the legends of great heroes and ruthless villains, delve into the stories of the
                    noble houses that shape the fate of the realm, and uncover the mysteries of the White
                    Walkers lurking beyond the Wall.
                </p>
                <p>
                    Whether you seek the thrill of epic battles, the intrigue of courtly politics, or the
                    deep-seated connections between its inhabitants, the World of Ice and Fire offers an
                    adventure like no other. Join us as we explore the depths of this fascinating universe,
                    where every choice can lead to glory or doom.
                </p>
            </section>

            <section className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>BOOKS</h2>
                    <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/books')} 
                        className="ml-3"
                    >
                        View All
                    </Button>
                </div>
                <Row>
                    {books.map((book) => (
                        <Col xs={12} md={4} key={book.isbn}>
                            <Card className="mb-4 shadow-sm border-light">
                                <Card.Body>
                                    <Card.Title>{book.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {Array.isArray(book.authors) && book.authors.length > 1 ? "Authors: " : "Author: "}
                                        {Array.isArray(book.authors) ? book.authors.join(", ") : "Unknown Author"}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>ISBN:</strong> {book.isbn} <br />
                                        <strong>Pages:</strong> {book.numberOfPages} <br />
                                        <strong>Released:</strong> {new Date(book.released).toLocaleDateString()} <br />
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => navigate(`/books/${book.name}`)}>
                                        Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>CHARACTERS</h2>
                    <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/characters')} 
                        className="ml-3"
                    >
                        View All
                    </Button>
                </div>
                <Row>
                    {characters.map((character) => (
                        <Col xs={12} md={4} key={character.name}>
                            <Card className="mb-4 shadow-sm border-light">
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {character.titles.length > 0 ? `Titles: ${character.titles.join(", ")}` : 'No Titles'}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Culture:</strong> {character.culture || 'Unknown'} <br />
                                        <strong>Born:</strong> {character.born || 'Unknown'} <br />
                                        <strong>Died:</strong> {character.died || 'Unknown'}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => navigate(`/characters/${character.name}`)}>
                                        Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>HOUSES</h2>
                    <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/houses')} 
                        className="ml-3"
                    >
                        View All
                    </Button>
                </div>
                <Row>
                    {houses.map((house) => (
                        <Col xs={12} md={4} key={house.name}>
                            <Card className="mb-4 shadow-sm border-light">
                                <Card.Body>
                                    <Card.Title>{house.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {house.founder ? `Founder: ${house.founder}` : 'Founder Unknown'}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Region:</strong> {house.region} <br />
                                        <strong>Founded:</strong> {house.founded || 'Unknown'} <br />
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => navigate(`/houses/${house.name}`)}>
                                        Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>
    );
};

export default Main;
