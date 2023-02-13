import { createAsyncThunk } from '@reduxjs/toolkit';
import productsApi from '../../api/productsApi';


export const loadAllProducts= createAsyncThunk(
    'products/loadAllProducts',
    async () => {
        const response = await productsApi.getAll();
        return response;
    }
);
