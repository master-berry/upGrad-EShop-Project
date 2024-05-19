// redux/store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk correctly
import rootReducer from '../reducers/root-reducer'; // Assuming you have reducers in a 'reducers' folder

// Initial state
const initialState = {
  auth: { // Use 'auth' key for authentication state
    isLoggedIn: false,
    isAdmin: false
  },
  snackbar: { // Initialize snackbar state
    message: '',
    open: false
  },
  user: {}
  // Add more initial state properties as needed
};

// Middleware setup
const middleware = [thunk]; // Adjust the import here

// Create Redux store
const store = createStore(
  rootReducer, // Combined reducers
  initialState,
  applyMiddleware(...middleware)
);

export default store;
