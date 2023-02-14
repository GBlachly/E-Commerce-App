import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authActions';


const options = {
    name: 'auth',
    initialState: {
        user: {},
        loggedIn: false,
        isLoading: true, 
        hasError: false,
    },
    reducers: {},
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.loggedIn = false;
            state.isLoading = true;
            state.hasError = false;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.loggedIn = true;
            state.isLoading = false;
            state.hasError = false;
        },
        [loginUser.rejected]: (state, action) => {
            state.loggedIn = false;
            state.isLoading = false;
            state.hasError = true;
        },
    }
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