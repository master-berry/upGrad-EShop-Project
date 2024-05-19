import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, InputAdornment } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginSuccess, updateIsAdmin } from '../../common/redux/actions/auth-actions';
import { jwtDecode } from 'jwt-decode';
import { setUserData } from '../../common/redux/actions/userSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json(); // Extract response body
            console.log(data);
            console.log('User authenticated successfully!');

            // Try to extract the token from the response headers
            let token = response.headers.get('x-auth-token');
            if (!token) {
                console.warn('Token not found in response headers. Checking response body.');
                token = data.token; // Fallback to check if token is in the response body
            }

            console.log('Received token:', token); // Log the token for debugging
            console.log('Received data:', data); // Log the response data for debugging

            if (!token) {
                throw new Error('Token not found in response headers or body');
            }

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Decode JWT token to access its payload
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const isAdmin = data.roles.includes('ADMIN'); // Check if user is admin

            // Dispatch login success action and update isAdmin status
            dispatch(loginSuccess());
            dispatch(updateIsAdmin(isAdmin));
            dispatch(setUserData(data));

            // Navigate to products page
            navigate('/products');
        } else {
            console.error('Authentication failed');
            setError('Authentication failed');
        }
    } catch (error) {
        console.error('Error occurred while signing in:', error);
    }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <LockOutlined sx={{ fontSize: 50 }} />
      <Typography variant="h5">Sign In</Typography>
      <TextField
        label="Email Address"
        variant="outlined"
        margin="normal"
        fullWidth
        style={{ width: '300px', marginBottom: '15px' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        style={{ width: '300px', marginBottom: '15px' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* Icon for password visibility toggle */}
            </InputAdornment>
          ),
        }}
      />
      {error && <Typography variant="body2" color="error" style={{ marginBottom: '15px' }}>{error}</Typography>}
      <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#3f51b5', color: 'white' }} onClick={handleSignIn}>
        Sign In
      </Button>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign up!</Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        upGrad 2024
      </Typography>
    </div>
  );
};

export default SignIn;
