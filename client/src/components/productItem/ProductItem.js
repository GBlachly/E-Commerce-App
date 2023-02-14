import './ProductItem.css';
import React from 'react'; 


export const ProductItem = (props) => {

    return (
        <div className='product-item'>
            <p>{props.product.id}</p>
            <p>{props.product.name}</p>
            <p>{props.product.price}</p>
            <p>Index: {props.index}</p>
        </div>
    );
};