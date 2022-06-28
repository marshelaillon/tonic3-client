import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'SEND_LOGIN_REQUEST',
  async credentials => {
    try {
      console.log('credentials', credentials);
      const { data } = await axios.post(
        'http://localhost:3001/api/users/login',
        credentials
      );
      return data;
    } catch (error) {
      console.error('/user/login ERROR ', error);
    }
  }
);

export const logoutUser = createAsyncThunk('SEND_LOGOUT_REQUEST', async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/users/logout');
    return response.data;
  } catch (error) {
    console.error('user/logout ERROR', error);
  }
});

export const checkUser = createAsyncThunk('CHECK_USER_BY_COOKIES', async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/users/getMe');
    return data;
  } catch (error) {
    console.error('user/getMe ERROR', error);
  }
});

export const forgotPassword = createAsyncThunk(
  'SEND_EMAIL_CHANGE_PASSWORD',
  async dataEmail => {
    try {
      const data = await axios.post(
        'http://localhost:3001/api/users/forgot-password',
        dataEmail
      );
      console.log('LLEGE ATA ACA ', data);

      return data;
    } catch (error) {
      console.log('forgotPassword ERROR', error);
    }
  }
);

export const newPassword = createAsyncThunk(
  'UPDATE_NEW_PASSWORD',
  async dataPassword => {
    try {
      const data = await axios.post(
        `http://localhost:3001/api/users/${dataPassword.id}/new-password`,
        dataPassword
      );
      return data;
    } catch (error) {
      console.log('ESTO ES EL ERROR DE NEW ERROR', error);
    }
  }
);

export const userReducer = createReducer(
  {},
  {
    [loginUser.fulfilled]: (state, action) => action.payload?.data,
    [logoutUser.fulfilled]: (state, action) => action.payload,
    [checkUser.fulfilled]: (state, action) => action.payload?.data,
    // {maxi}
    [forgotPassword.fulfilled]: (state, action) => action.payload?.data,
  }
);
