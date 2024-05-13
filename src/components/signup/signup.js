import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [signUpStatus, setSignUpStatus] = useState({});

  const handleSignUp = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      // Send POST request to the backend
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          contactNumber,
        }),        
      });
      


      // Check if request was successful
      if (response.ok) {
        setSignUpStatus({ success: true, message: 'User signed up successfully. Please login!' });
      } else {
        // Handle error response
        const errorData = await response.json();
        setSignUpStatus({ success: false, message: errorData.message || 'Failed to sign up' });
      }
    } catch (error) {
      console.error('Sign-up error:', error.message);
      setSignUpStatus({ success: false, message: error.message || 'Failed to sign up' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <LockOutlined sx={{ fontSize: 50 }} />
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="First Name"
        variant="outlined"
        margin="normal"
        fullWidth
        style={{ width: '300px', marginBottom: '15px' }}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        margin="normal"
        fullWidth
        style={{ width: '300px', marginBottom: '15px' }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        style={{ width: '300px', marginBottom: '15px' }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <TextField
        label="Contact Number"
        variant="outlined"
        margin="normal"
        fullWidth
        style={{ width: '300px', marginBottom: '15px' }}
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      {signUpStatus.message && (
        <Typography variant={signUpStatus.success ? 'body1' : 'body2'} color={signUpStatus.success ? 'primary' : 'error'} align="center" style={{ marginBottom: '15px' }}>
          {signUpStatus.message}
        </Typography>
      )}
      <Button
        variant="contained"
        style={{ width: '300px', marginTop: '20px', backgroundColor: '#3f51b5', color: 'white' }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/signin">Sign in!</Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        upGrad 2024
      </Typography>
    </div>
  );
};

export default SignUp;
