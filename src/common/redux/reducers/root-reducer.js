import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import snackbarReducer from './snackbar-reducer';
import userReducer from '../actions/userSlice';


// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  user: userReducer 
});

export default rootReducer;
