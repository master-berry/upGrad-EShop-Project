import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, InputAdornment } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginSuccess, updateIsAdmin } from '../../common/redux/actions/auth-actions';
import { jwtDecode } from 'jwt-decode';

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
        const { token } = data; // Extract token from response
        console.log(data);
        console.log('User authenticated successfully!');

        // Store the token in local storage
      localStorage.setItem('token', token);

        // Decode JWT token to access its payload
        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.sub.includes('admin'); // Check if user is admin

        // Dispatch login success action and update isAdmin status
        dispatch(loginSuccess());
        dispatch(updateIsAdmin(isAdmin));

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
