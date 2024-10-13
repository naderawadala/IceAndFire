import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Spinner } from 'react-bootstrap';

const BookDetail = () => {
    const { name } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        query {
                            bookByName(name: "${name}") {
                                authors
                                characters
                                country
                                id
                                isbn
                                mediaType
                                name
                                numberOfPages
                                povCharacters
                                publisher
                                released
                                url
                            }
                        }`,
                    }),
                });

                const data = await response.json();

                if (data.errors) {
                    throw new Error(data.errors.map(err => err.message).join(", "));
                }

                // Check if the book was found
                if (!data.data.bookByName) {
                    throw new Error(`No book found with name "${name}"`);
                }

                setBook(data.data.bookByName);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [name]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mt-5">
            <h2>{book.name}</h2>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Authors:</strong> {book.authors.length > 1 ? book.authors.join(", ") : book.authors[0]}</p>
            <p><strong>Pages:</strong> {book.numberOfPages}</p>
            <p><strong>Released:</strong> {new Date(book.released).toLocaleDateString()}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Country:</strong> {book.country}</p>
            <p><strong>Media Type:</strong> {book.mediaType}</p>

            <Accordion defaultActiveKey="">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Characters</Accordion.Header>
                    <Accordion.Body>
                        {book.characters.length > 0 ? (
                            <ul>
                                {book.characters.map((char, index) => (
                                    <li key={index}>{char}</li> // Replace with character name if available
                                ))}
                            </ul>
                        ) : (
                            <p>No characters found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>POV Characters</Accordion.Header>
                    <Accordion.Body>
                        {book.povCharacters.length > 0 ? (
                            <ul>
                                {book.povCharacters.map((povChar, index) => (
                                    <li key={index}>{povChar}</li> // Replace with character name if available
                                ))}
                            </ul>
                        ) : (
                            <p>No POV characters found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default BookDetail;
