import './CheckoutPage.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectCart, selectCartLoading, selectCartError } from '../../store/cart/cartSlice';
import { checkout } from '../../store/cart/cartActions';


export const CheckoutPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectCartLoading);
    const hasError = useSelector(selectCartError);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();


    //WILL AT TIMES HAVE A LOT OF DECIMAL PLACES, MUST STOP AT TWO
    const totalPrice = () => {
        const total = cart.products.map((product) => {
            const currency = product.productPrice;
            const number = Number(currency.replace(/[^0-9.-]+/g,""));

            return number * product.quantity;
        }).reduce((x, y) => x + y); 

        return total;
    };
    //WILL AT TIMES HAVE A LOT OF DECIMAL PLACES, MUST STOP AT TWO


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
            <h2>Total Price: {totalPrice()}</h2>

            <div className='checkout'>
                <button onClick={ ()=>{dispatch(checkout(totalPrice()))} }>Checkout!!!</button>
            </div>

        </div>
    );
};
