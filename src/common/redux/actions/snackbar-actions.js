// snackbarActions.js
export const setSnackbarMessage = (message) => ({
    type: 'SET_SNACKBAR_MESSAGE',
    payload: message
  });
  
  export const clearSnackbarMessage = () => ({
    type: 'CLEAR_SNACKBAR_MESSAGE'
  });
  
  // Action type constants
  export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

  // Action creators
  export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR
  });