// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice'; // Import your redux action
import { Button, Form } from 'react-bootstrap'; // Using React Bootstrap for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await dispatch(loginUser({ username, password })).unwrap();
            // Store the token in local storage for further requests
            console.log(token.token)
            localStorage.setItem('token', token.token);
            //window.location.reload(); // Full page refresh
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <div className="mt-3 text-center">
                <p>
                    No account? <Link to="/register">Create a new account here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
