import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const addGuests = createAsyncThunk("ADD_EVENT", (body, thunkAPI) => {
    
    const { currentEvent } = thunkAPI.getState();
    // {eventId: eventid, emails: ["asda@asf.com"]}
    if(thunk.user.isAdmin){
        try {
            const { data } = await axios.post("http://localhost:3001/api/admin/add-event", body);
            console.log(data);
        } catch (error) {
            console.error("/user/login ERROR ", error)
        }    
    }
    
});

export const addGuestsReducer = createReducer({}, {
    [addGuests.fulfilled]: (state, action) => action.payload?.data,
});