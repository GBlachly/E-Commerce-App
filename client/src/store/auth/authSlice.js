import { createSlice } from '@reduxjs/toolkit';


const options = {
    name: 'auth',
    intialState: {
        login: {            //State of login inputs. May just want to handle in login component
            username: '',
            password: ''
        },
        register: {         //State of register inputs. May just want to handle in register component
            username: '',
            password: '',
            email: ''
        },
        loggedIn: false,
        //admin: false,     ??? Here or in user slice ???
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};

const authSlice = createSlice(options);


export default authSlice.reducer;
