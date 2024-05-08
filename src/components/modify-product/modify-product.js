import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage } from '../../common/redux/actions/snackbar-actions'; // Import the setSnackbarMessage action

const ModifyProduct = ({ setSnackbarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl: '',
    description: ''
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    })
    .then(response => {
      if (response.ok) {
        dispatch(setSnackbarMessage(`Product ${product.name} modified successfully.`)); // Dispatch setSnackbarMessage action
        navigate('/products');
      } else {
        console.error('Failed to update product');
      }
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginTop: '70px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Modify Product
        </Typography>
      </div>      
      <TextField
        name="name"
        label="Name"
        value={product.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="category"
        label="Category"
        value={product.category}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="manufacturer"
        label="Manufacturer"
        value={product.manufacturer}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="availableItems"
        label="Available Items"
        value={product.availableItems}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="price"
        label="Price"
        value={product.price}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="imageUrl"
        label="Image URL"
        value={product.imageUrl}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        value={product.description}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }} onClick={handleSubmit}>
        Modify Product
      </Button>
    </div>
  );
};

export default ModifyProduct;
