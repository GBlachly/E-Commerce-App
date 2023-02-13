import { createSlice } from '@reduxjs/toolkit';
import { loadAllProducts } from './productsActions';


const options = {
    name: 'products',
    initialState: {
        products: [],
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: {
        [loadAllProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload; 
            state.isLoading = false;
            state.hasError = false;
        },
        [loadAllProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
};


const productsSlice = createSlice(options);

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectHasError = (state) => state.products.hasError;

export default productsSlice.reducer;



/*  ARRAY OF PRODUCTS

    initialState: {
        products: [
            {
                id: 0,
                name: '',
                price: 0,
                stock: 0
            }
        ],...

*/