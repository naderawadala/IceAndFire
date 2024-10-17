import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/authSlice/authSlice';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Import toast

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser({ username, password })).unwrap();
            toast.success('Registration successful!'); // Show success toast
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed! Please try again.'); // Show error toast
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="mb-4">Register</h2>
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
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
