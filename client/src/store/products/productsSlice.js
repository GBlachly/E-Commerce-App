import { createSlice } from '@reduxjs/toolkit';


const options = {
    name: 'products',
    intialState: {
        products: [],
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};

const productsSlice = createSlice(options);


export default productsSlice.reducer;



/*  ARRAY OF PRODUCTS

    intialState: {
        products: [
            {
                id: 0,
                name: '',
                price: 0,
                stock: 0
            }
        ],...

*/