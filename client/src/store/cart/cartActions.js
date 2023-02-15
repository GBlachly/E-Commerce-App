import { createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';
import authApi from '../../api/authApi';


export const createCart = createAsyncThunk(
    'cart/createCart',
    async (data) => {
        
        /*const loggedIn = await authApi.loggedIn();
        if (!loggedIn) {
            return null;
        }; */

        const { totalPrice, products } = data;

        const response = await cartApi.create({ totalPrice, products });
        return response;
    }
);

export const loadUserCart = createAsyncThunk(
    'cart/loadUserCart',
    async () => {
        
        /*const loggedIn = await authApi.loggedIn();
        if (!loggedIn) {
            return null;
        }; */

        const response = await cartApi.getByUserId();
        return response;
    }
);

export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async (data) => {
        
        /*const loggedIn = await authApi.loggedIn();
        if (!loggedIn) {
            return null;
        }; */

        const { totalPrice, product } = data;   /* product =  {id, name, quantity} */
        
        const response = await cartApi.addItem({ totalPrice, product });
        return response;
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (data) => {
        
        /*const loggedIn = await authApi.loggedIn();
        if (!loggedIn) {
            return null;
        }; */

        const { totalPrice, productId } = data;
        
        const response = await cartApi.deleteItem({ totalPrice, productId });
        return response;
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async (data) => {
        
        /*const loggedIn = await authApi.loggedIn();
        if (!loggedIn) {
            return null;
        }; */

        const { totalPrice, productId, quantity } = data;
        
        const response = await cartApi.updateQuantity({ totalPrice, productId, quantity });
        return response;
    }
);