import { createSlice } from '@reduxjs/toolkit';
import { loadUserOrders } from './ordersActions';


const options = {
    name: 'orders',
    initialState: {
        orders: [],
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {
        [loadUserOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadUserOrders.fulfilled]: (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [loadUserOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
};


const ordersSlice = createSlice(options);

export const selectOrders = (state) => state.orders.orders;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectHasError = (state) => state.orders.hasError;

export default ordersSlice.reducer;



/*  ARRAY OF ORDERS

    initialState: {
        orders: [
            {
                id: 0, 
                userId: 0,
                totalPrice: 0, 
                shipStatus: '',   
                products: [
                    { productId: 0, productName: '', quantity: 0 }
                ]
            }
        ],...

*/