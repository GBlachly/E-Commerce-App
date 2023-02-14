import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";


export const registerUser = createAsyncThunk();

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        const response = await authApi.login(data);
        return response;
    }
);

export const checkUserLogin = createAsyncThunk();

export const logoutUser = createAsyncThunk();
