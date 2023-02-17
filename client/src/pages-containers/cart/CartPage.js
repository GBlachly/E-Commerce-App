import './CartPage.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectCart, selectIsLoading, selectHasError } from '../../store/cart/cartSlice';
import { loadUserCart, clearCartItems } from '../../store/cart/cartActions';
import { CartItem } from '../../components/cartItem/CartItem';


export const CartPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadUserCart());
    }, [dispatch]); 


    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        )
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
                <h2>Cart Id: {cart.id}</h2>
                <h3>User Id: {cart.userId}</h3>
                <h3>Total Price: {cart.totalPrice}</h3>

                <button onClick={ ()=>{dispatch(clearCartItems())}}>Clear Cart</button>
            
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
