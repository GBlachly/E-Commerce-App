import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data) => {
        const response = await authApi.register(data);
        return response;
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        const response = await authApi.login(data);
        return response;
    }
);

//export const checkUserLogin = createAsyncThunk();

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        const response = await authApi.logout();
        return response;
    }
);
