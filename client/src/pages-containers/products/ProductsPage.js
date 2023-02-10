import './ProductsPage.css';
import React, { useState, useEffect } from 'react'; 
import { ProductItem } from '../../components/productItem/ProductItem';

import productsApi from '../../api/productsApi';


export const ProductsPage = () => {
    const [ products, setProducts ] = useState([
        {id: 1, name: 'Lamp', price: 11.99},
        {id: 2, name: 'Desk', price: 22.99},
        {id: 3, name: 'Chair', price: 33.99},
        {id: 4, name: 'Table', price: 44.99},
        {id: 5, name: 'Keyboard', price: 55.99},
        {id: 6, name: 'Mouse', price: 66.99},
        {id: 7, name: 'Headphones', price: 77.99},
        {id: 8, name: 'Speakers', price: 88.99}
    ]);

    useEffect(() => {
            productsApi.getAll().then(response => setProducts(response));
    }, []);

    
    return (
        <div className='col-12'>

            <h1>Products</h1>
            
            <div className='products'>
                {products.map(product => {
                    return (
                        <ProductItem product={product}/>
                    )
                })}
            </div>

        </div> 
    );
};
