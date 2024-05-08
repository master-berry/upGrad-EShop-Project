import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Snackbar, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import CreatableSelect from 'react-select/creatable';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSaveProduct = async () => {
    try {

      const token = localStorage.getItem('token');

      const productData = {
        name,
        category,
        manufacturer,
        availableItems: parseInt(availableItems),
        price: parseFloat(price),
        imageUrl,
        description
      };
  
      // Send product data to backend API
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        // Product added successfully
        const productName = name;
        setSnackbarSeverity('success');
        setSnackbarMessage(`Product ${productName} added successfully.`);
        setSnackbarOpen(true);
        // Clear form fields
        setName('');
        setCategory('');
        setManufacturer('');
        setAvailableItems('');
        setPrice('');
        setImageUrl('');
        setDescription('');
      } else {
        // Handle error response
        const data = await response.json();
        setSnackbarSeverity('error');
        setSnackbarMessage(data.message || 'An error occurred.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message || 'An error occurred.');
      setSnackbarOpen(true);
    }
  };  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginTop: '70px' }}>
        <Typography variant="h5">Add Product</Typography>
      </div>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div style={{ height: '52px', marginBottom: '10px', marginTop: '15px', alignItems: 'left' }}>
        <CreatableSelect
          isClearable
          placeholder="Category"
          onChange={(newValue) => setCategory(newValue ? newValue.value : '')}
          options={categories.map((category) => ({ value: category, label: category }))}
          styles={{
            control: (base) => ({ ...base, height: '52px', marginBottom: '10px' }),
            placeholder: (base) => ({ ...base, textAlign: 'left', marginLeft: '10px' }),
            // Add additional styles here if needed
          }}
        />
      </div>
      <TextField
        label="Manufacturer"
        variant="outlined"
        margin="normal"
        fullWidth
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />
      <TextField
        label="Available Items"
        variant="outlined"
        margin="normal"
        fullWidth
        value={availableItems}
        onChange={(e) => setAvailableItems(e.target.value)}
      />
      <TextField
        label="Price"
        variant="outlined"
        margin="normal"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Image URL"
        variant="outlined"
        margin="normal"
        fullWidth
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        margin="normal"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        style={{ marginTop: '20px', backgroundColor: '#3f51b5', color: 'white' }}
        onClick={handleSaveProduct}
      >
        Save Product
      </Button>
      {error && <Typography variant="body2" color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
