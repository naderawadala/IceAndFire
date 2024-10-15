import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Main = () => {
    const books = [
        { title: "A Game of Thrones", description: "The first book in the series, setting the stage for the epic conflict of the realm." },
        { title: "A Clash of Kings", description: "The second book that delves deeper into the politics and battles for the throne." },
        { title: "A Storm of Swords", description: "The third installment that escalates the tension and war in Westeros." },
    ];

    const characters = [
        { name: "Jon Snow", description: "The illegitimate son of Eddard Stark, raised in Winterfell." },
        { name: "Daenerys Targaryen", description: "The last surviving member of the Targaryen dynasty." },
        { name: "Tyrion Lannister", description: "A witty and intelligent member of House Lannister." },
    ];

    const houses = [
        { name: "House Stark", description: "The noble house of Winterfell, known for their honor." },
        { name: "House Lannister", description: "The wealthy house from Casterly Rock, known for their gold." },
        { name: "House Targaryen", description: "The house known for their dragons and claim to the Iron Throne." },
    ];

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
                <h2>BOOKS</h2>
                <Row>
                    {books.map((book, index) => (
                        <Col xs={12} md={4} key={index}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>{book.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className="mt-5">
                <h2>CHARACTERS</h2>
                <Row>
                    {characters.map((character, index) => (
                        <Col xs={12} md={4} key={index}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <Card.Text>{character.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className="mt-5">
                <h2>HOUSES</h2>
                <Row>
                    {houses.map((house, index) => (
                        <Col xs={12} md={4} key={index}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>{house.name}</Card.Title>
                                    <Card.Text>{house.description}</Card.Text>
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
