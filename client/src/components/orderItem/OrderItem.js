import './OrderItem.css';
import React from 'react'; 


export const OrderItem = (props) => {
    const { product } = props;

    return (
        <div className='order-item row mx-3 border-bottom border-secondary'>
                
                <div className='col-3 my-3'>
                    <img 
                        src={product.productUrl} 
                        alt='product' 
                        className=''
                    />
                </div>
                
                <p className='col-3 mt-3'>Product Name: {product.productName}</p>
                <p className='col-3 mt-3'>Product Price: {product.productPrice}</p>
                <p className='col-3 mt-3'>Quantity: {product.quantity}</p>
            
        </div>
    );
};