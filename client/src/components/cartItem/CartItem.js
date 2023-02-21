import './CartItem.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { loggedOutItemDelete } from '../../store/cart/cartSlice';
import { deleteCartItem } from '../../store/cart/cartActions';


export const CartItem = (props) => {
    const { product } = props;
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();


    const handleDelete = () => {
        if (!loggedIn) {
            dispatch(loggedOutItemDelete(product.productId));
        };

        if (loggedIn) {
            dispatch(deleteCartItem(product.productId))
        };
    };

    
    return (
        <div className='cart-item'>
            <p>Product Id: {product.productId}</p>
            <p>Product Name: {product.productName}</p>
            <p>Product Price: {product.productPrice}</p>
            <p>Quantity: {product.quantity}</p>

            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};