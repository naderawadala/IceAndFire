import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Accordion, Spinner, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHouseByName, deleteHouse } from '../redux/housesSlice/housesSlice';

const HouseDetail = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const house = useSelector((state) => state.houses.house);
    const loading = useSelector((state) => state.houses.status === 'loading');
    const error = useSelector((state) => state.houses.error);
    
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        dispatch(fetchHouseByName(name));
    }, [dispatch, name]);

    const handleDelete = async () => {
        try {
            await dispatch(deleteHouse(house.name)).unwrap();
            navigate('/houses');
        } catch (error) {
        }
    };

    const handleUpdate = () => {
        navigate(`/update-house/${house.name}`, { state: house });
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!house) {
        return <p>No house found!</p>;
    }

    return (
        <div className="mt-5 container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/houses')} 
                className="mb-4" 
                style={{ padding: '0.375rem 1rem' }}
            >
                <i className="bi bi-arrow-left"></i> Go Back
            </Button>
            <h2>{house.name}</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <p><strong>Region:</strong> {house.region}</p>
                    <p><strong>Coat of Arms:</strong> {house.coatOfArms}</p>
                    <p><strong>Words:</strong> {house.words}</p>
                    <p><strong>Current Lord:</strong> {house.currentLord}</p>
                    <p><strong>Heir:</strong> {house.heir}</p>
                    <p><strong>Founded:</strong> {house.founded}</p>
                    <p><strong>Founder:</strong> {house.founder}</p>
                    <p><strong>Died Out:</strong> {house.diedOut}</p>
                </div>
                <div>
                    <Button variant="primary" className="me-2" onClick={handleUpdate}>Update</Button>
                    <Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
                </div>
            </div>

            <Accordion defaultActiveKey="">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Titles</Accordion.Header>
                    <Accordion.Body>
                        {house.titles && house.titles.length > 0 ? (
                            <ul>
                                {house.titles.map((title, index) => (
                                    <li key={index}>{title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No titles found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Seats</Accordion.Header>
                    <Accordion.Body>
                        {house.seats && house.seats.length > 0 ? (
                            <ul>
                                {house.seats.map((seat, index) => (
                                    <li key={index}>{seat}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No seats found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Ancestral Weapons</Accordion.Header>
                    <Accordion.Body>
                        {house.ancestralWeapons && house.ancestralWeapons.length > 0 ? (
                            <ul>
                                {house.ancestralWeapons.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No ancestral weapons found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Cadet Branches</Accordion.Header>
                    <Accordion.Body>
                        {house.cadetBranches && house.cadetBranches.length > 0 ? (
                            <ul>
                                {house.cadetBranches.map((branch, index) => (
                                    <li key={index}>{branch}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No cadet branches found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Sworn Members</Accordion.Header>
                    <Accordion.Body>
                        {house.swornMembers && house.swornMembers.length > 0 ? (
                            <ul>
                                {house.swornMembers.map((member, index) => (
                                    <li key={index}>{member}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No sworn members found.</p>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this house?</Modal.Body>
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

export default HouseDetail;
