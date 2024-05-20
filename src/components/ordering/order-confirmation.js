import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Stepper, Step, StepLabel, Snackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';

// Selector to get user data from Redux store
const selectUserData = state => state.user.userData;

const OrderConfirmation = () => {
  const location = useLocation();
  const { productDetails, selectedAddress } = location.state || {};
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const userData = useSelector(selectUserData);

  const steps = ['Items', 'Select Address', 'Order Confirmation'];

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    const userID = userData.id;

    const orderDetails = {
      product: productDetails.id,
      quantity: productDetails.quantity,
      address: selectedAddress.id,
      user: userID,
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Order placed successfully!');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/products'); // Redirect to products page
        }, 2000);
      } else {
        const errorData = await response.json();
        setSnackbarSeverity('error');
        setSnackbarMessage(`Failed to place order: ${errorData.message}`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('An unexpected error occurred while placing the order.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!productDetails || !selectedAddress) {
    return <Typography variant="h6">Missing product details or address information.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="50px">
      <Box width="80%">
        {/* Stepper */}
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconProps={{ style: { color: '#3f51b5' } }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box width="80%" marginTop="30px">
        <Box display="flex" justifyContent="space-between" marginTop="50px">
          {/* Product details */}
          <Box width="60%" borderRight="1px solid #ccc" paddingRight="20px">
            <Typography variant="h4" gutterBottom>{productDetails?.name}</Typography>
            <Typography variant="body1" gutterBottom marginTop="30px">Quantity: <strong>{productDetails?.quantity}</strong></Typography>
            <Typography variant="body1" gutterBottom marginTop="30px">Category: <strong>{productDetails?.category}</strong></Typography>
            <Typography variant="body1" gutterBottom marginTop="30px">Description: {productDetails?.description}</Typography>
            <Typography variant="h5" color="red" gutterBottom marginTop="30px">Total Price: ₹{productDetails.totalPrice}</Typography>
          </Box>
          {/* Vertical line */}
          <Box width="1px" height="100%" bgcolor="#ccc" />
          {/* Address details */}
          <Box width="40%" paddingLeft="20px">
            <Typography variant="h4" gutterBottom>Address Details:</Typography>
            <Typography variant="body1">Name: {selectedAddress?.name}</Typography>
            <Typography variant="body1">Contact Number: {selectedAddress?.contactNumber}</Typography>
            <Typography variant="body1">Street: {selectedAddress?.street}</Typography>
            <Typography variant="body1">City: {selectedAddress?.city}</Typography>
            <Typography variant="body1">State: {selectedAddress?.state}</Typography>
            <Typography variant="body1">Landmark: {selectedAddress?.landmark}</Typography>
            <Typography variant="body1">Zipcode: {selectedAddress?.zipcode}</Typography>
          </Box>
        </Box>
      </Box>
      <Box marginTop="50px">
        {/* Buttons */}
        <Button variant="outlined" onClick={handleGoBack}>Back</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderConfirmation;
