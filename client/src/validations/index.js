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


  export function checkPasswordStrength(password) {
    const minLength = 8;
  
    // Criteria 1: At least 8 characters
    const hasMinLength = password.length >= minLength;
  
    // Criteria 2: Contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
  
    // Criteria 3: Contains at least one lowercase letter
    const hasLowercase = /[a-z]/.test(password);
  
    // Criteria 4: Contains at least one digit
    const hasNumber = /\d/.test(password);
  
    // Criteria 5: Contains at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isStrong = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  
    return {
      minLength: hasMinLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      isStrong
    };
  }