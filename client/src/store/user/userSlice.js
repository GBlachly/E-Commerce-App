import { createSlice } from '@reduxjs/toolkit';


const options = {
    name: 'user',
    intialState: {
        user: null,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};

const userSlice = createSlice(options);


export default userSlice.reducer;



/*  USER OBJECT

    intialState: {
        user: {
            id: 0,
            username: '',
            email: '',
            admin: false
        },...

*/