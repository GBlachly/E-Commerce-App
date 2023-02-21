import './CheckoutPage.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectCart, selectIsLoading, selectHasError } from '../../store/cart/cartSlice';
import { checkout } from '../../store/cart/cartActions';


export const CheckoutPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const totalPrice = 199.99; 


    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        )
    };

    if (cart.products.length === 0) {
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

            <h1>Checkout</h1>
            <h2>Total Price: {totalPrice}</h2>

            <div className='checkout'>
                <button onClick={ ()=>{dispatch(checkout(totalPrice))} }>Checkout!!!</button>
            </div>

        </div>
    );
};
