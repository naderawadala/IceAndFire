import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

    return data.data.register;
});

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

    const { token, role } = data.data.login;

    return { token, role };
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('token');
    return null;
});

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.role = action.payload.role;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.user = { role: action.payload.role };
                state.role = action.payload.role;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.role = null;
            });
    },
});

export default authSlice.reducer;
