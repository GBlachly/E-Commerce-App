import { createAsyncThunk } from '@reduxjs/toolkit';
import ordersApi from '../../api/ordersApi';


export const loadUserOrders = createAsyncThunk(
    'orders/loadUserOrders',
    async () => {
        const response = await ordersApi.getByUserId();
        return response; 
    }
);
