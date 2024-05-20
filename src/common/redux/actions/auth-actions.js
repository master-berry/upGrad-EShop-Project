import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_IS_ADMIN } from './action-types';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const updateIsAdmin = (isAdmin) => ({
  type: UPDATE_IS_ADMIN,
  payload: { isAdmin }
});
