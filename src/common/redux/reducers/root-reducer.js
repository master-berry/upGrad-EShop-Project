// root-reducer.js

import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import snackbarReducer from './snackbar-reducer';
import userReducer from '../actions/userSlice';

// Initial state for the root reducer
const initialState = {
  auth: { // Nested under 'auth' key
    isLoggedIn: false,
    isAdmin: false
  }
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  user: userReducer 
});

export default rootReducer;
