import './OrderItem.css';
import React from 'react'; 


export const OrderItem = (props) => {
    const { product } = props;

    return (
        <div className='order-item'>
            <img src={product.productUrl} alt='product' style={{ width: 100, height: 'auto', }}/>
            <p>Product Id: {product.productId}</p>
            <p>Product Name: {product.productName}</p>
            <p>Quantity: {product.quantity}</p>
        </div>
    );
};