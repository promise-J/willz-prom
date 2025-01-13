import * as Yup from 'yup';


export const signupSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    username: Yup.string().min(6, 'Username must be at least 6 characters').required('Username is required')
  });

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    username: Yup.string().min(6, 'Username must be at least 6 characters').required('Username is required')
  });
