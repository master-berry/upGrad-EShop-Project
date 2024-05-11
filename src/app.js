import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './common/redux/store/redux-store';
import Navbar from './components/navbar/navbar';
import SignIn from './components/signin/signin';
import SignUp from './components/signup/signup';
import ProductsPage from './components/product-page/product-page';
import AddProduct from './components/add-product/add-product';
import ModifyProduct from './components/modify-product/modify-product';
import ProductDetailPage from './components/product-detail/product-detail';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar setSearchQuery={setSearchQuery} /> 
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<ProductsPage searchQuery={searchQuery} />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/modify-product/:id" element={<ModifyProduct />} />
            <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
