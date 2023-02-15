import './ProductPage.css';
import React from 'react'; 
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectProducts } from '../../store/products/productsSlice';


export const ProductPage = () => {
    const { index } = useParams();
    const i = Number(index);
    const products = useSelector(selectProducts);
    const product = products[i];


    return (
        <div className='col-12'>

            <h1>Product</h1>

            <div className='product'>
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>Index: {index}</p>
            </div>

        </div>
    );
};
