import './ProductItem.css';
import React from 'react'; 
import { Link } from 'react-router-dom';


export const ProductItem = (props) => {
    const { id, name, price } = props.product;
    const { index } = props;

    return (
        <div className='product-item'>
            <p>{id}</p>
            <p>{name}</p>
            <p>{price}</p>
            <p>Index: {index}</p>
            <Link to={`/products/${index}`}>More Details</Link>
        </div>
    );
};