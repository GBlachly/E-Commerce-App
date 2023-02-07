import './CartItem.css';
import React from 'react'; 


export const CartItem = (props) => {
    const { product } = props;

    return (
        <div className='cart-item'>
            <p>Product Id: {product.productId}</p>
            <p>Product Name: {product.productName}</p>
            <p>Quantity: {product.quantity}</p>
        </div>
    );
};