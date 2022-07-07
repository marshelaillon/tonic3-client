import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeItem = createAsyncThunk(
    'REMOVE_INVITATIONS',
    async (body, thunkAPI) => {
        const thunk = thunkAPI.getState();
        console.log(thunk.listener, 'THUNK');
        if (thunk.user.isAdmin) {
            if (thunk.listener !== 'users') {
                try {
                    console.log("LLEEGUE ACA SIN QUERER")
                    await axios.delete(
                        `http://localhost:3001/api/admin/remove-${thunk.listener}/${body.id}`
                    );
                } catch (error) {
                    console.error(`remove-${thunk.listener}`, error.response.data);
                }
            }
            if (thunk.listener === "users") {
                try {
                    console.log("NO ME OPERDI EN EL CAMINO")
                    await axios.delete(`http://localhost:3001/api/users/remove/${body.id}`)
                } catch (error) {
                    console.error(`remove-${thunk.listener}`, error.response.data)
                }

            }
        }
    }
);
