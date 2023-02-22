import { createSlice } from '@reduxjs/toolkit';
import {
    createCart,
    loadUserCart,
    replaceCartItems,
    addCartItem,
    deleteCartItem,
    updateCartItemQuantity,
    clearCartItems,
    checkout,
} from './cartActions';


const options = {
    name: 'cart',
    initialState: {
        cart: {
            products: [],
        },
        guestCart: false,
        isLoading: false,
        hasError: false,
    },

    reducers: {
        loggedOutItemAdd(state, action) {
            const foundIndex = state.cart.products.findIndex(product => product.productId === action.payload.productId);
            if (foundIndex === -1) {
                state.cart.products.push(action.payload);
                state.guestCart = true;
            } else {
                state.cart.products[foundIndex].quantity = action.payload.quantity;
            };
        },

        loggedOutItemDelete(state, action) {
            const foundIndex = state.cart.products.findIndex(product => product.productId === action.payload);
            state.cart.products.splice(foundIndex, 1);

            if (!state.cart.products.length) {
                state.guestCart = false;
            } else {
                state.guestCart = true;
            };
        },

        logoutCart(state, action) {
            state.cart = {
                products: [],
            };
            state.guestCart = false;
        },

        turnOffGuestCart(state, action) {
            state.guestCart = false;
        },
    },

    extraReducers: {
        //CREATE CART ACTION
        [createCart.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [createCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.guestCart = false;
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
            state.guestCart = false;
            state.isLoading = false;
            state.hasError = false;
        },
        [loadUserCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //REPLACE USER CART ITEMS AT LOGIN
        [replaceCartItems.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [replaceCartItems.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.guestCart = false;
            state.isLoading = false;
            state.hasError = false;
        },
        [replaceCartItems.rejected]: (state, action) => {
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
            state.guestCart = false;
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
            state.guestCart = false;
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
            state.guestCart = false;
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
            state.guestCart = false;
            state.isLoading = false;
            state.hasError = false;
        },
        [clearCartItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },

        //CHECKOUT ACTION
        [checkout.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [checkout.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.guestCart = false;
            state.isLoading = false;
            state.hasError = false;
        },
        [checkout.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        
    }
};

const cartSlice = createSlice(options);


//EXPORTS
export const selectCart = (state) => state.cart.cart;
export const selectGuestCart = (state) => state.cart.guestCart;

export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.hasError;

export const { 
    loggedOutItemAdd, 
    loggedOutItemDelete, 
    loggedOutClearCart, 
    logoutCart,
    turnOffGuestCart
 } = cartSlice.actions

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