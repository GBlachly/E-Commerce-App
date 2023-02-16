import './CartItem.css';
import React from 'react'; 
import { useDispatch } from 'react-redux';

import { deleteCartItem } from '../../store/cart/cartActions';


export const CartItem = (props) => {
    const { product } = props;
    const dispatch = useDispatch();

    return (
        <div className='cart-item'>
            <p>Product Id: {product.productId}</p>
            <p>Product Name: {product.productName}</p>
            <p>Product Price: {product.productPrice}</p>
            <p>Quantity: {product.quantity}</p>

            <button onClick={ ()=>{dispatch(deleteCartItem(product.productId))}}>Delete</button>
        </div>
    );
};