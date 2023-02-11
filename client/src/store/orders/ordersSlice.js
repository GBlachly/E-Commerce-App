import { createSlice } from '@reduxjs/toolkit';


const options = {
    name: 'orders',
    intialState: {
        orders: [],
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {}
};

const ordersSlice = createSlice(options);


export default ordersSlice.reducer;



/*  ARRAY OF ORDERS

    intialState: {
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