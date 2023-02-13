import { createSlice } from '@reduxjs/toolkit';
import {} from './authActions';


const options = {
    name: 'auth',
    initialState: {
        user: null,
        loggedIn: false,
        isLoading: true, 
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};


const authSlice = createSlice(options);

export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.user.admin;
export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectHasError = (state) => state.auth.hasError;

export default authSlice.reducer;



/*  USER OBJECT

    initialState: {
        user: {
            id: 0,
            username: '',
            email: '',
            admin: false
        },...

*/