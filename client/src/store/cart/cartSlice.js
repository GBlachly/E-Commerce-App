import { createSlice } from '@reduxjs/toolkit';
import {} from './cartActions';


const options = {
    name: 'cart',
    initialState: {
        cart: null,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};

const cartSlice = createSlice(options);


//EXPORTS
export const selectCart = (state) => state.cart.cart;

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectHasError = (state) => state.cart.hasError;

export default cartSlice.reducer;



/*  CART OBJECT

    initialState: {
        cart: {
            id: 0,
            userId: 0,
            totalPrice: 0,
            products: [
                { productId: 0, productName: '', quantity: 0 }
            ]
        },...

*/