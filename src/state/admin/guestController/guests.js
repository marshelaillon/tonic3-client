import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const addGuests = createAsyncThunk(
    'ADD_GUESTS',
    async (body, thunkAPI) => {
        const thunk = thunkAPI.getState();
        if (thunk.user.isAdmin) {
            try {
                const { data } = await axios.post(
                    'http://localhost:3001/api/admin/add-guest',
                    body
                );
            } catch (error) {
                console.error('/ADD-GUESTS ERROR ', error);
            }
        }
    }
);

export const getGuests = createAsyncThunk(
    'GET_GUESTS',
    async (undefined, thunkAPI) => {
        const thunk = thunkAPI.getState();
        if (thunk.user.isAdmin) {
            try {
                const { data } = await axios.get(
                    'http://localhost:3001/api/admin/get-all-guests'
                );
                console.log('REDUX GUESTS', data?.data);
                return data?.data;
            } catch (error) {
                console.error('/GET-ALL-GUESTS ERROR ', error);
            }
        }
    }
);

export const sendInvitations = createAsyncThunk(
    'SEND_INVITATIONS',
    async (undefined, thunkAPI) => {
        const thunk = thunkAPI.getState();
        if (thunk.user.isAdmin) {
            try {
                await axios.get('http://localhost:3001/api/admin/send-invitations');
            } catch (error) {
                console.error('send-invitations', error);
            }
        }
    }
);

export const removeInvitations = createAsyncThunk(
    'REMOVE_INVITATIONS',
    async (body, thunkAPI) => {
        const thunk = thunkAPI.getState();
        if (thunk.user.isAdmin) {
            try {
                await axios.delete(
                    `http://localhost:3001/api/admin/remove-guest/${body.id}`,

                );
            } catch (error) {
                console.error('remove-guest', error);
            }
        }
    }
);

export const guestsReducer = createReducer(
    {},
    {
        // [addGuests.fulfilled]: (state, action) => action.payload?.data,
        [getGuests.fulfilled]: (state, action) =>
            console.log('action.payload?.data', action.payload),
    }
);
