// root-reducer.js

import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import snackbarReducer from './snackbar-reducer';

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
  snackbar: snackbarReducer
});

export default rootReducer;
