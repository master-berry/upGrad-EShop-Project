import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_IS_ADMIN } from '../actions/action-types';

// Initial state for authentication
const initialState = {
  isLoggedIn: false,
  isAdmin: false
};

// Reducer function for authentication
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      };
    case UPDATE_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload.isAdmin
      };
    default:
      return state;
  }
};

export default authReducer;
