import './OrderItem.css';
import React from 'react'; 


export const OrderItem = (props) => {
    const { product } = props;

    return (
        <div className='order-item'>
            <p>Product Id: {product.productId}</p>
            <p>Product Name: {product.productName}</p>
            <p>Quantity: {product.quantity}</p>
        </div>
    );
};