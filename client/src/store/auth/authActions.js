import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";


export const registerUser = createAsyncThunk();

export const loginUser = createAsyncThunk();

export const checkUserLogin = createAsyncThunk();

export const logoutUser = createAsyncThunk();