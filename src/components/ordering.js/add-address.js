import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepLabel, Button, Snackbar, Typography, TextField, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ProductDetailPage from '../product-detail/product-detail';
import { jwtDecode } from 'jwt-decode';

const AddAddress = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();  
  const [newAddress, setNewAddress] = useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zipcode: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const steps = ['Items', 'Select Address', 'Order Confirmation'];

  const handleNext = () => {
    if (activeStep === 1) {
      if (selectedAddress !== '') {
        setActiveStep(prevStep => prevStep + 1);
      } else {
        setSnackbarMessage('Please select an address!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      // Handle other steps
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddressSelect = (event) => {
    setSelectedAddress(event.target.value);
    handleSnackbarClose();
  };

  const handleAddressChange = (event) => {
    setNewAddress({ ...newAddress, [event.target.name]: event.target.value });
    handleSnackbarClose();
  };

  const handleAddAddress = () => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
  
    // Check if token exists
    if (!token) {
      // Handle case where token is not available
      setSnackbarMessage('User not authenticated. Please log in.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Decode the token to extract user information
    const decodedToken = jwtDecode(token);
    const user = 'decodedToken.sub;'
    const addressWithUser = { ...newAddress, user };
    console.log(addressWithUser);
  
    // Create headers with authorization token
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  
    // Make POST request to API endpoint
    fetch('http://localhost:8080/api/addresses', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(addressWithUser),
    })
      .then(response => {
        if (response.ok) {
          // Address saved successfully
          setSnackbarMessage('Address saved successfully!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        } else {
          // Handle case where request was not successful
          return response.json().then(data => {
            setSnackbarMessage(`Error: ${data.message}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          });
        }
      })
      .catch(error => {
        // Handle any unexpected errors
        console.error('Error:', error);
        setSnackbarMessage('An unexpected error occurred');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };
  
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="50px">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box marginTop="50px">
        {activeStep === 1 ? (
          <div>
            <Typography variant="h6">Select Address:</Typography>
            <div>
              <TextField
                select
                value={selectedAddress}
                onChange={handleAddressSelect}
                fullWidth
                variant="outlined"
                style={{ width: '800px', marginBottom: '15px' }}
                InputProps={{ placeholder: 'Select...' }}
              >
                {/* Fetch existing addresses and display them here */}
              </TextField>
            </div>
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom="15px">
              <div>
                <Typography variant="body1">-OR-</Typography>
              </div>
              <div>
                <Typography variant="h5" style={{ color: 'black', marginBottom: '15px', marginTop: '15px', marginRight: '10px' }}>Add Address</Typography>
              </div>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <div>
                <TextField
                  name="name"
                  label="Name"
                  value={newAddress.name}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <TextField
                  name="contactNumber"
                  label="Contact Number"
                  value={newAddress.contactNumber}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <TextField
                  name="street"
                  label="Street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <TextField
                  name="city"
                  label="City"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <TextField
                  name="state"
                  label="State"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <TextField
                  name="landmark"
                  label="Landmark"
                  value={newAddress.landmark}
                  onChange={handleAddressChange}
                  fullWidth
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <TextField
                  name="zipcode"
                  label="Zip Code"
                  value={newAddress.zipcode}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                  style={{ width: '500px', marginBottom: '15px' }}
                />
              </div>
            </Box>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleAddAddress} style={{ width: '500px', marginBottom: '15px', backgroundColor: '#3f51b5' }}>Save Address</Button>
            </div>
          </div>
        ) : activeStep === 2 ? (
          <div>
            {/* Order confirmation content */}
          </div>
        ) : (
          <ProductDetailPage />
        )}
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginRight: '10px', color: '#3f51b5' }}>Back</Button>
          <Button variant="contained" color="primary" onClick={handleNext} style={{ backgroundColor: '#3f51b5' }}>Next</Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AddAddress;