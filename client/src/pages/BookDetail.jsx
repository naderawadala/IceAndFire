import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Accordion, Spinner, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookByName, deleteBook } from '../redux/booksSlice'; // Import the deleteBook action

const BookDetail = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select book and status from Redux store
    const book = useSelector((state) => state.books.book);
    const loading = useSelector((state) => state.books.status === 'loading');
    const error = useSelector((state) => state.books.error);
    
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        dispatch(fetchBookByName(name));
    }, [dispatch, name]);

    const handleDelete = async () => {
        // Dispatch the deleteBook action
        try {
            await dispatch(deleteBook(book.isbn)).unwrap(); // Using unwrap to handle potential errors
            navigate('/books'); // Navigate back to the book list after deletion
        } catch (error) {
            console.error('Delete error:', error.message); // Handle error if needed
        }
    };

    const handleUpdate = () => {
        navigate(`/update-book/${book.name}`, { state: book }); // Pass book data to BookForm
    };
    

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!book) {
        return <p>No book found!</p>; // Handle case where no book is found
    }

    return (
        <div className="mt-5 container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>{book.name}</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Authors:</strong> {book.authors.join(", ")}</p>
                    <p><strong>Pages:</strong> {book.numberOfPages}</p>
                    <p><strong>Released:</strong> {new Date(book.released).toLocaleDateString()}</p>
                    <p><strong>Publisher:</strong> {book.publisher}</p>
                    <p><strong>Country:</strong> {book.country}</p>
                    <p><strong>Media Type:</strong> {book.mediaType}</p>
                </div>
                <div>
                    <Button variant="primary" className="me-2" onClick={handleUpdate}>Update</Button>
                    <Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
                </div>
            </div>

            <Accordion defaultActiveKey="">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Characters</Accordion.Header>
                    <Accordion.Body>
                        {book.characters.length > 0 ? (
                            <ul>
                                {book.characters.map((char, index) => (
                                    <li key={index}>{char}</li>
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
                                    <li key={index}>{povChar}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No POV characters found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {/* Delete Confirmation Modal */}
            <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookDetail;
