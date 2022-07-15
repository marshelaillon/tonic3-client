import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

export const removeItem = createAsyncThunk(
  'REMOVE_INVITATIONS',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();

    const { token } = thunkAPI.getState()
    if (thunk.user.isAdmin) {
      if (thunk.listener !== 'users') {
        try {
          await axios.delete(

            `${BASE_URL}/admin/remove-${thunk.listener}/${body.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
        } catch (error) {
          console.error(`remove-${thunk.listener}`, error.response.data);
        }
      }
      if (thunk.listener === 'users') {
        try {
          console.log('NO ME OPERDI EN EL CAMINO');
          await axios.delete(`${BASE_URL}/users/remove/${body.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error(`remove-${thunk.listener}`, error.response.data);
        }
      }
    }
  }
);
