import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk correctly
import rootReducer from '../reducers/root-reducer'; // Assuming you have reducers in a 'reducers' folder
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = createStore(
  rootReducer, // Combined reducers
  initialState,
  applyMiddleware(...middleware)
);

// Persist the store
const persistor = persistStore(store);

export default store;