import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './authActions';


const options = {
    name: 'auth',
    initialState: {
        user: {},
        loggedIn: false,
        isLoading: true, 
        hasError: {
            loginErr: false,
            registerErr: false,
        },
    },
    reducers: {},
    extraReducers: {
        //REGISTER ACTION STATES
        [registerUser.pending]: (state, action) => {
            state.loggedIn = false;
            state.isLoading = true;
            state.hasError = { loginErr: false, registerErr: false };
        },
        [registerUser.fulfilled]: (state, action) => {
            
            if (!action.payload) {
                state.user = {};
                state.loggedIn = false;
                state.isLoading = false;
                state.hasError = { loginErr: false, registerErr: false };
                return;
            };

            state.user = action.payload;
            state.loggedIn = true;
            state.isLoading = false;
            state.hasError = { loginErr: false, registerErr: false };
            
        },
        [registerUser.rejected]: (state, action) => {
            state.loggedIn = false;
            state.isLoading = false;
            state.hasError = { loginErr: false, registerErr: true };
        },

        //LOGIN ACTION STATES
        [loginUser.pending]: (state, action) => {
            state.loggedIn = false;
            state.isLoading = true;
            state.hasError = { registerErr: false, loginErr: false };
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.loggedIn = true;
            state.isLoading = false;
            state.hasError = { registerErr: false, loginErr: false };
        },
        [loginUser.rejected]: (state, action) => {
            state.loggedIn = false;
            state.isLoading = false;
            state.hasError = { registerErr: false, loginErr: true };
        },

        //LOGOUT ACTION STATES
        [logoutUser.pending]: (state, action) => {},    //???
        [logoutUser.fulfilled]: (state, action) => {
            state.user = {};
            state.loggedIn = false;
        },
        [logoutUser.rejected]: (state, action) => {},     //??? If logout fails at server,                                                    
    },                                                    // do i still want to logout on the client ???
};

const authSlice = createSlice(options);


//EXPORTS
export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.user.admin;
export const selectLoggedIn = (state) => state.auth.loggedIn;

export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.hasError;

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