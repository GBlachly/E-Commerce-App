import { createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';
//import authApi from '../../api/authApi';


export const createCart = createAsyncThunk(     //Do i want to create a cart when user registers
    'cart/createCart',                          //or when they first add an item to their cart
    async (products) => {
        
        const response = await cartApi.create(products);
        return response;
    }
);

export const loadUserCart = createAsyncThunk(
    'cart/loadUserCart',
    async () => {

        const response = await cartApi.getByUserId();
        return response;
    }
);

export const replaceCartItems = createAsyncThunk(
    'cart/replaceCartItems',
    async (products) => {

        const response = await cartApi.replace(products);
        return response;
    }
);

export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async (data) => {
        
        const { id, name, price, url, quantity } = data;
        
        const response = await cartApi.addItem({ id, name, price, url, quantity });
        return response;
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (productId) => {
        
        const response = await cartApi.deleteItem(productId);
        return response;
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async (data) => {

        const { productId, quantity } = data;
        
        const response = await cartApi.updateQuantity(productId, quantity);
        return response;
    }
);

export const clearCartItems = createAsyncThunk(
    'cart/clearCartItems',
    async () => {

        const response = await cartApi.clearCart();
        return response;
    }
);

export const checkout = createAsyncThunk(
    'cart/checkout',
    async (data) => {

        const { totalPrice, addressId } = data;

        const response = await cartApi.checkout(totalPrice, addressId);
        return response;
    }
);