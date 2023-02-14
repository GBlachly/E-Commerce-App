import './ProductsPage.css';
import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoading, selectHasError, selectProducts } from '../../store/products/productsSlice';
import { loadAllProducts } from '../../store/products/productsActions';
import { ProductItem } from '../../components/productItem/ProductItem';


export const ProductsPage = () => {
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllProducts());
    }, [dispatch]); 
    

    if (isLoading) {
        return (
            <div className='col-12'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError) {
        return (
            <div className='col-12'>
                <h1>Error Occurred</h1>
            </div>
        )
    };
    
    return (
        <div className='col-12'>

            <h1>Products</h1>
            
            <div className='products'>
                {products.map((product, index) => {
                    return (
                        <ProductItem product={product} index={index}/>
                    )
                })}
            </div>

        </div> 
    );
};
