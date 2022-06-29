import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'SEND_REGISTER_REQUEST',
  async registerBody => {
    console.log("no me sale buaaaa", registerBody);
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/users/register', registerBody
      );
      console.log("esta es la data del registerbody", data);
      return data;
    } catch (error) {
      console.error('/user/register ERROR ', error);
    }
  }
);

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

export const checkCaptcha = createAsyncThunk('CHECK_CAPTCHA', async tokenCaptcha => {
  console.log("esto es el token", tokenCaptcha);
  try {
    const { data } = await axios.post('http://localhost:3001/api/users/register-with-recaptcha', tokenCaptcha);
    return data;
  } catch (error) {
    console.error('user/register-with-recaptcha ERROR', error);
  }
});

export const userReducer = createReducer(
  {},
  {
    [registerUser.fulfilled]: (state, action) => action.payload?.data,
    [loginUser.fulfilled]: (state, action) => action.payload?.data,
    [logoutUser.fulfilled]: (state, action) => action.payload,
    [checkUser.fulfilled]: (state, action) => action.payload?.data,
    [checkCaptcha.fulfilled]: (state, action) => action.payload?.data,
  }
);
