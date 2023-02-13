import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products/productsSlice';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import ordersReducer from './orders/ordersSlice';
import cartReducer from './cart/cartSlice';


export default configureStore({
    reducer: combineReducers({
        products: productsReducer,
        auth: authReducer,
        user: userReducer,
        orders: ordersReducer,
        cart: cartReducer,
    }),
});
