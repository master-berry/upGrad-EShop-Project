// snackbarReducer.js
import { CLOSE_SNACKBAR } from '../actions/snackbar-actions'; // Import the CLOSE_SNACKBAR action type

const initialState = {
  message: '',
  open: false
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SNACKBAR_MESSAGE':
      return { ...state, message: action.payload, open: true };
    case 'CLEAR_SNACKBAR_MESSAGE':
      return { ...state, message: '', open: false };
    case CLOSE_SNACKBAR: // Place CLOSE_SNACKBAR case here
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};

export default snackbarReducer;
