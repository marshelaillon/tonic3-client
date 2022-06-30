import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const checkCaptcha = createAsyncThunk(
  'CHECK_CAPTCHA',
  async tokenCaptcha => {
    console.log('esto es el token', tokenCaptcha);
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/users/register-with-recaptcha',
        tokenCaptcha
      );
      return data;
    } catch (error) {
      console.error('/register-with-recaptcha ERROR', error);
    }
  }
);

export const captchaReducer = createReducer(
  {},
  {
    [checkCaptcha.fulfilled]: (state, action) => action.payload?.data,
  }
);
