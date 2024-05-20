import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { setSnackbarMessage } from '../../common/redux/actions/snackbar-actions'; 

const ProductCards = ({ searchQuery, category, sortBy }) => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn, isAdmin } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null); 
  const [open, setOpen] = useState(false); 
  const [originalOrder, setOriginalOrder] = useState([]);


  const handleBuyButtonClick = (productID) => {
    navigate(`/product-detail/${productID}`);
  };

  const CustomColorButton = styled(Button)({
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  });

  const handleEditClick = (productId) => {
    navigate(`/modify-product/${productId}`);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then(data => {
          if (category === 'All') {
            setProducts(data);
            setOriginalOrder([...data]); // Store original order of products
          } else {
            const filteredProducts = data.filter(product => product.category === category);
            setProducts(filteredProducts);
            setOriginalOrder([...filteredProducts]); // Store original order of filtered products
          }
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [isLoggedIn, navigate, category]);
  
  useEffect(() => {
    setProducts(prevProducts => {
      if (sortBy === 'Default') {
        return [...originalOrder]; // Restore the original order
      } else if (sortBy === 'Price high to low') {
        return [...prevProducts].sort((a, b) => b.price - a.price);
      } else if (sortBy === 'Price low to high') {
        return [...prevProducts].sort((a, b) => a.price - b.price);
      } else if (sortBy === 'Newest') {
        return [...prevProducts].reverse();
      }
      
      return prevProducts;
    });
  }, [sortBy, originalOrder]);

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  
  const handleOpenDeletionModal = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  
  const handleCloseDeletionModal = () => {
    setSelectedProductId(null);
    setOpen(false);
  };

  // Function to handle product deletion
  const handleDeleteProduct = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/products/${selectedProductId}`)
      .then(response => response.json())
      .then(product => {
        const productName = product.name; 
        // Delete the product
        fetch(`http://localhost:8080/api/products/${selectedProductId}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': `${token}`
          }
        })
        .then(response => {
          if (response.ok) {
            dispatch(setSnackbarMessage(`Product ${productName} deleted successfully.`));
            // Refresh products after deletion
            fetchProducts();
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
    handleCloseDeletionModal();
  };

  // Function to fetch products
  const fetchProducts = () => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => {
        if (category === 'All') {
          setProducts(data);
        } else {
          setProducts(data.filter(product => product.category === category));
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: '120px', marginRight: '120px', marginTop: '20px' }}>
        {filteredProducts.map(product => (
          <Card key={product.id} style={{ width: '30%', marginBottom: '20px' }}>
            <CardMedia
              component="img"
              image={product.imageUrl}
              style={{ height: 200 }}
              alt={product.name}
            />
            <CardContent style={{ height: '200px', overflow: 'hidden' }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">₹{product.price}</Typography>
              <Typography variant="body2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxHeight: '2.5rem' }}>
                {product.description.length > 300 ? `${product.description.substring(0, 300)}...` : product.description}
              </Typography>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <CustomColorButton variant="contained" onClick={() => handleBuyButtonClick(product.id)}>
              Buy
            </CustomColorButton>

              {isAdmin && (
                <div>
                  <IconButton onClick={() => handleEditClick(product.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeletionModal(product.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      {/* Deletion confirmation modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleCloseDeletionModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: {
              zIndex: -1
            }
          }}
        >
          <Fade in={open}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: '200px' }}>
              <h2 id="transition-modal-title">Confirm Deletion</h2>
              <p id="transition-modal-description">Are you sure you want to delete this product?</p>
              <Button onClick={handleDeleteProduct} style={{ marginRight: '10px', backgroundColor: '#3f51b5', color: 'white' }}>              
                OK
              </Button>
              <Button onClick={handleCloseDeletionModal} style={{ color: '#3f51b5', border: '1px solid #3f51b5' }}>Cancel</Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default ProductCards;
