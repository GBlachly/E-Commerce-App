import './ProductsPage.css';
import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { loadUserCart } from '../../store/cart/cartActions';
import { selectProducts, selectProductsLoading, selectProductsError } from '../../store/products/productsSlice';
import { loadAllProducts } from '../../store/products/productsActions';
import { ProductItem } from '../../components/productItem/ProductItem';


export const ProductsPage = () => {
    const loggedIn = useSelector(selectLoggedIn)
    const isLoading = useSelector(selectProductsLoading);
    const hasError = useSelector(selectProductsError);
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedIn) {
            dispatch(loadUserCart());
        };

        dispatch(loadAllProducts());
    }, [loggedIn, dispatch]); 
    

    if (isLoading) {
        return (
            <div className='col-12 mt-3'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError) {
        return (
            <div className='col-12 mt-3'>
                <h1>Error Occurred</h1>
            </div>
        )
    };
    
    return (
        <div className='col-12 mt-3'>

            <h1>Products</h1>
            
            <div className='row'>
                {products.map((product, index) => {
                    return (
                        <ProductItem product={product} index={index}/>
                    )
                })}
            </div>

        </div> 
    );
};
