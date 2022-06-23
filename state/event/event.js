import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const setEvent = createAsyncThunk("SET_EVENT", (data, thunkAPI) => {
    // user debe ser admin
    const thunk = thunkAPI.getState();

    if(thunk.user.isAdmin){
        try {
            const { data } = await axios.post("/api/event/set", data);
        
        } catch (error) {
            console.error("/user/login ERROR ", error)
    
        }    
    }
    
});

export const getEvent = createAsyncThunk("GET_EVENT", (data) => {

    try {
        const { data } = await axios.post("/api/event/get", data);
        return data;
    
    } catch (error) {
        console.error("/user/login ERROR ", error)

    }    
});


export const eventReducer = createReducer({}, {
    [getEvent.fulfilled]: (state, action) => action.payload,
});
