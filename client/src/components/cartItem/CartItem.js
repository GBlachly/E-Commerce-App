import './CartItem.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectProducts } from '../../store/products/productsSlice'
import { loggedOutItemDelete } from '../../store/cart/cartSlice';
import { deleteCartItem } from '../../store/cart/cartActions';


export const CartItem = (props) => {
    const { product } = props;
    const products = useSelector(selectProducts);
    const index = products.findIndex(item => item.id === product.productId)
    const stock = products[index].stock;
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

            {product.quantity > stock ? <p className='text-danger'>Please Edit Quantity</p> : null}

            <Link to={`/products/${index}`}>More Details</Link>
            <br></br>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};