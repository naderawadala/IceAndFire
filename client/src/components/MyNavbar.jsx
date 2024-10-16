import React from 'react';
import { Link, useNavigate  } from 'react-router-dom'; 
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaFire, FaSnowflake } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice/authSlice'; 
import './MyNavbar.css';

const MyNavbar = ({ username }) => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            dispatch(logoutUser()); 
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ textTransform: 'uppercase', fontSize: '1.25rem', marginLeft: '15px' }}>
                <FaFire style={{ color: '#FF4500', marginRight: '5px', fontSize: '1.5rem' }} />
                Ice and Fire
                <FaSnowflake style={{ color: '#1E90FF', marginLeft: '5px', fontSize: '1.5rem' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/houses" className="nav-link">HOUSES</Nav.Link>
                    <Nav.Link as={Link} to="/books" className="nav-link">BOOKS</Nav.Link>
                    <Nav.Link as={Link} to="/characters" className="nav-link">CHARACTERS</Nav.Link>
                    <Nav.Item className="nav-button-container">
                        <Button 
                            variant="outline-danger" 
                            onClick={handleLogout} 
                            className="logout-button" 
                            style={{ padding: '0.375rem 1rem' }}
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </Button>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
