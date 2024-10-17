import * as Yup from 'yup';

const userValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required.')
        .min(3, 'Username must be between 3 and 50 characters.')
        .max(50, 'Username must be between 3 and 50 characters.'),
    
    password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password must be between 6 and 50 characters.')
        .max(50, 'Password must be between 6 and 50 characters.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character (e.g., !, @, #, $, etc.).'),
});

export default userValidationSchema;
