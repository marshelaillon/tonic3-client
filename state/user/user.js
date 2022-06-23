import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("SEND_LOGIN_REQUEST", (data) => {

    try {
        const { data } = await axios.post("/api/user/login", data);
        return data;
    
    } catch (error) {
        console.error("/user/login ERROR ", error)

    }    
});

export const logoutUser = createAsyncThunk("SEND_LOGOUT_REQUEST", () => {

    try {
        const response = await axios.get("/api/user/logout");

    } catch (error) {
        console.error("user/logout ERROR", error);

    }
})

export const checkUser = createAsyncThunk("CHECK_USER_BY_COOKIES", () => {
    try {
        const { data } = await axios.get("/api/user/me");
        return data;

    } catch (error) {
        console.error("user/me ERROR", error);
    }
});

export const userReducer = createReducer({}, {
    [loginUser.fulfilled]: (state, action) => action.payload,
    [logoutUser.fulfilled]: (state, action) => {},
    [checkUser.fulfilled]: (state, action) => action.payload,
});
