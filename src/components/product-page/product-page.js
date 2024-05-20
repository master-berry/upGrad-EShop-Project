import React, { useState } from 'react';
import CategoryTab from '../category-tab/category-tab';
import SortDropdown from '../sort-dropdown/sort-dropdown';
import ProductCards from '../product-cards/product-cards';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ModifyProduct from '../modify-product/modify-product';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar } from '../../common/redux/actions/snackbar-actions'; 

const ProductsPage = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const snackbarOpen = useSelector(state => state.snackbar.open);
  const snackbarMessage = useSelector(state => state.snackbar.message);
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    dispatch(closeSnackbar()); 
  };

  return (
    <div>
      <main>
        <CategoryTab setSelectedCategory={setSelectedCategory} />
        <SortDropdown setSortBy={setSortBy} />
        <ProductCards searchQuery={searchQuery} category={selectedCategory} sortBy={sortBy} />
        
      </main>
      {/* Display snackbar based on snackbarOpen state and message from Redux store */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductsPage;
