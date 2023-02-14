import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data) => {
        const { username, password } = data;

        const registerResponse = await authApi.register(data);

        if (registerResponse) {
            const loginResponse = await authApi.login({ username, password })
            return loginResponse 
        } else {
            return null;
        };
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        const {username, password} = data
        const response = await authApi.login({username, password});
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
