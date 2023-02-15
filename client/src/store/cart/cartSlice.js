import { createSlice } from '@reduxjs/toolkit';
import {
    createCart,
    loadUserCart,
    addCartItem,
    deleteCartItem,
    updateCartItemQuantity,
    clearCartItems,
} from './cartActions';


const options = {
    name: 'cart',
    initialState: {
        cart: null,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {
        //CREATE CART ACTION
        [createCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [createCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [createCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //GET USER CART ACTION
        [loadUserCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadUserCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [loadUserCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        
        //ADD CART ITEM ACTION
        [addCartItem.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [addCartItem.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [addCartItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        
        //DELETE CART ITEM ACTION
        [deleteCartItem.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [deleteCartItem.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [deleteCartItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        
        //UPDATE CART ITEM QUANTITY ACTION
        [updateCartItemQuantity.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [updateCartItemQuantity.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [updateCartItemQuantity.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //CLEAR CART ITEMS ACTION
        [clearCartItems.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [clearCartItems.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [clearCartItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        
    }
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