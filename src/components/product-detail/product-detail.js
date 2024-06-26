import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin'); 
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProductData(id);
    }
  }, [isLoggedIn, id]);

  const fetchProductData = (productId) => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
  }

  const isQuantityValid = () => {
    return parseInt(quantity) <= product.availableItems;
  }

  const handlePlaceOrder = () => {
    
    navigate('/add-address', {
      state: {
        productDetails: {
          id: product.id,
          name: product.name,
          quantity: quantity,
          category: product.category,
          description: product.description,
          totalPrice: product.price * quantity, // Calculate total price based on quantity
        }
      }
    });
  };

  return (
    <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      {product ? (
        <>
          <div style={{ width: '35%', marginRight: '50px' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto', maxWidth: '600px' }} />
          </div>
          <div style={{ width: '65%', textAlign: 'left' }}>
            <div style={{ marginBottom: '30px' }}>
              <Typography variant="h4" align="left" style={{ marginRight: '100px' }}>
                {product.name}
              </Typography>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#3f51b5', color: 'white', borderRadius: '10px', padding: '10px', marginBottom: '20px', display: 'inline-block', width: 'fit-content' }}>
                Available Quantity: {product.availableItems}
              </div>
            </div>
            <div style={{ marginBottom: '10px', width: 'fit-content' }}>
              <Typography variant="body1" align="left">
                Category: <strong>{product.category}</strong>
              </Typography>
            </div>
            <div style={{ marginBottom: '20px', width: 'fit-content' }}>
              <Typography variant="body1" align="left">
                {product.description}
              </Typography>
            </div>
            <div style={{ marginBottom: '30px', width: 'fit-content' }}>
              <Typography variant="body1" align="left" style={{ color: 'red', fontSize: '1.5rem' }}>
                ₹{product.price}
              </Typography>
            </div>
            <TextField
              type="number"
              label="Enter Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ marginBottom: '20px', width: '30%' }}
              InputProps={{ inputProps: { min: 0 } }}
            />
            {quantity !== '' && !isQuantityValid() && (
              <Typography variant="body2" color="error">
                Entered quantity exceeds available quantity.
              </Typography>
            )}
            <div style={{ width: '30%', marginBottom: '20px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#3f51b5', color: 'white', width: '100%' }}
                disabled={!isQuantityValid()}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default ProductDetailPage;
