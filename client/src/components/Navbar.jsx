import React from 'react';
import { Link } from 'react-router-dom'; 
import { Navbar, Nav, Button  } from 'react-bootstrap';
import { FaHome, FaInfoCircle, FaPhone,FaFire, FaSnowflake } from 'react-icons/fa';


const MyNavbar = ({ username }) => {

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            // Implement logout functionality here
            console.log("User logged out");
        }
    };

    return (
        <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', fontSize: '1.25rem' }}>
                <FaFire style={{ color: '#FF4500', marginRight: '5px', fontSize: '1.5rem' }} /> {/* Fire Color */}
                Ice and Fire
                <FaSnowflake style={{ color: '#1E90FF', marginLeft: '5px', fontSize: '1.5rem' }} /> {/* Ice Color */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/houses" style={{ fontSize: '1.25rem' }}>ALL HOUSES</Nav.Link>
                    <Nav.Link as={Link} to="/books" style={{ fontSize: '1.25rem' }}>ALL BOOKS</Nav.Link>
                    <Nav.Link as={Link} to="/characters" style={{ fontSize: '1.25rem' }}>ALL CHARACTERS</Nav.Link>
                    <Button variant="link" onClick={handleLogout} style={{ fontSize: '1.25rem' }}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
