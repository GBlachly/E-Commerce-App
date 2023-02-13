import { createSlice } from '@reduxjs/toolkit';
import {} from './userActions';


const options = {
    name: 'user',
    initialState: {
        user: null,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};


const userSlice = createSlice(options);

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectHasError = (state) => state.user.hasError;

export default userSlice.reducer;



/*  USER OBJECT

    initialState: {
        user: {
            id: 0,
            username: '',
            email: '',
            admin: false
        },...

*/