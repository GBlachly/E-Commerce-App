import { createAsyncThunk } from '@reduxjs/toolkit';
import ordersApi from '../../api/ordersApi';


export const loadUserOrders = createAsyncThunk(
    'orders/loadUserOrders',
    async (userId = null) => {
        const response = await ordersApi.getByUserId(userId);
        return response; 
    }
);
