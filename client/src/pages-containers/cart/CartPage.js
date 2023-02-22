import './CartPage.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectCart, selectCartLoading, selectCartError, logoutCart } from '../../store/cart/cartSlice';
import { loadUserCart, clearCartItems } from '../../store/cart/cartActions';
import { CartItem } from '../../components/cartItem/CartItem';


export const CartPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectCartLoading);
    const hasError = useSelector(selectCartError);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const totalPrice = 199.99;


    useEffect(() => {
        if (loggedIn) {
            dispatch(loadUserCart());
        };
    }, [loggedIn, dispatch]); 


    const handleCartClear = () => {
        if (!loggedIn) {
            dispatch(logoutCart());
        };

        if (loggedIn) {
            dispatch(clearCartItems())
        };
    };


    if (!cart || cart.products.length === 0) {
        return (
            <div className='col-12'>
                <h1>Cart Empty</h1>
            </div>
        )
    };

    if (isLoading) {
        return (
            <div className='col-12'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError) {
        return (
            <div className='col-12'>
                <h1>Error Occurred</h1>
            </div>
        )
    };

    return (
        <div className='col-12'>

            <h1>Cart</h1>

            <div className='cart'>
                <h2>Cart Id: {cart.id && cart.id}</h2>
                <h3>User Id: {cart.userId && cart.userId}</h3>
                <h3>Total Price: {totalPrice}</h3>

                <button onClick={handleCartClear}>Clear Cart</button>
            
                <div className='cart-items'>
                    {cart.products.map(product => {
                        return (
                            <CartItem product={product} />
                        )
                    })} 
                </div>
            </div>
                
        </div>
    );
};
