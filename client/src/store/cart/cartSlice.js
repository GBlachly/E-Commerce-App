import { createSlice } from '@reduxjs/toolkit';


const options = {
    name: 'cart',
    intialState: {
        cart: null,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};

const cartSlice = createSlice(options);


export default cartSlice.reducer;



/*  CART OBJECT

    intialState: {
        cart: {
            id: 0,
            userId: 0,
            totalPrice: 0,
            products: [
                { productId: 0, productName: '', quantity: 0 }
            ]
        },...

*/