import { createSlice } from '@reduxjs/toolkit';
import {} from './userActions';


const options = {
    name: 'user',
    initialState: {
        registerInputs: {
            username: '',
            email: '',
            password: '',
        },
        loginInputs: {
            username: '',
            password: '',
        },
        updateInputs: {
            username: '',
            email: '',
            password: '',
        },
        isLoading: true,
        hasError: false,
    },
    reducers: {
        //Handle Changes in Register Page Inputs
        handleRegisterUsername(state, action) {
            state.registerInputs.username = action.payload;
        },
        handleRegisterEmail(state, action) {
            state.registerInputs.email = action.payload;
        },
        handleRegisterPassword(state, action) {
            state.registerInputs.password = action.payload;
        },
        clearRegisterInputs(state, action) {
            state.registerInputs.username = '';
            state.registerInputs.email = '';
            state.registerInputs.password = '';
        },

        //Handle Changes in Login Page Inputs
        handleLoginUsername(state, action) {
            state.loginInputs.username = action.payload;
        },
        handleLoginPassword(state, action) {
            state.loginInputs.password = action.payload;
        },
        clearLoginInputs(state, action) {
            state.loginInputs.username = '';
            state.loginInputs.password = '';
        },

        //Handle Changes in Account Page Inputs
        handleUpdateUsername(state, action) {
            state.updateInputs.username = action.payload;
        },
        handleUpdateEmail(state, action) {
            state.updateInputs.email = action.payload;
        },
        handleUpdatePassword(state, action) {
            state.updateInputs.password = action.payload;
        },
        clearUpdateInputs(state, action) {
            state.UpdateInputs.username = '';
            state.UpdateInputs.email = '';
            state.updateInputs.password = '';
        },
    },
    extraReducers: {}
};

const userSlice = createSlice(options);


//EXPORTS
export const selectRegisterUsername = (state) => state.user.registerInputs.username;
export const selectRegisterEmail = (state) => state.user.registerInputs.email;
export const selectRegisterPassword = (state) => state.user.registerInputs.password;

export const selectLoginUsername = (state) => state.user.loginInputs.username;
export const selectLoginPassword = (state) => state.user.loginInputs.password;

export const selectUpdateUsername = (state) => state.user.updateInputs.username;
export const selectUpdateEmail = (state) => state.user.updateInputs.email;
export const selectUpdatePassword = (state) => state.user.updateInputs.password;

export const selectIsLoading = (state) => state.user.isLoading;
export const selectHasError = (state) => state.user.hasError;

export const {
    handleRegisterUsername,
    handleRegisterEmail,
    handleRegisterPassword,
    clearRegisterInputs,
    handleLoginUsername,
    handleLoginPassword,
    clearLoginInputs
 } = userSlice.actions;

export default userSlice.reducer;
