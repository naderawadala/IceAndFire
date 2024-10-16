// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for registering a new user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation {
                    register(userDto: {
                        username: "${userData.username}",
                        password: "${userData.password}"
                    }) {
                        refreshToken
                        refreshTokenExpiration
                        username
                        role
                    }
                }
            `,
        }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.register; // Return the user data upon registration
});

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation {
                    login(loginDto: {
                        username: "${userData.username}",
                        password: "${userData.password}"
                    }) {
                        token
                        role
                    }
                }
            `,
        }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    // Get both token and role upon successful login
    const { token, role } = data.data.login;

    return { token, role }; // Return both token and role
});

// Async thunk for logging out the user
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    // Perform any necessary logout operations, like clearing local storage
    localStorage.removeItem('token'); // Clear token from local storage
    return null; // Return null to indicate logout
});

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    role: null, // Role is included in the initial state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload; // Set user data upon registration
                state.isAuthenticated = true; // Mark user as authenticated
                state.role = action.payload.role; // Store user role
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token; // Set the token returned from login
                state.isAuthenticated = true; // Update authentication status
                state.user = { role: action.payload.role }; // Create user object with role
                state.role = action.payload.role; // Store user role
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null; // Clear user information
                state.token = null; // Clear token
                state.isAuthenticated = false; // Update authentication status
                state.role = null; // Clear user role
            });
    },
});

export default authSlice.reducer;
