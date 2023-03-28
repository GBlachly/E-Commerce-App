import './CartPage.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { loadAllProducts } from '../../store/products/productsActions';
import { selectCart, selectCartLoading, selectCartError, logoutCart } from '../../store/cart/cartSlice';
import { loadUserCart, clearCartItems } from '../../store/cart/cartActions';
import { CartItem } from '../../components/cartItem/CartItem';


export const CartPage = () => {
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


    useEffect(() => {
        dispatch(loadAllProducts());
        
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


    //RENDERS 
    if (isLoading) {
        return (
            <div className='col-12 mt-3'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError) {
        return (
            <div className='col-12 mt-3'>
                <h1>Error Occurred</h1>
            </div>
        )
    };    
    
    if (!cart || cart.products.length === 0) {
        return (
            <div className='col-12 mt-3'>
                <h1>Cart Empty</h1>
            </div>
        )
    };

    return (
        <div className='col-12 mt-3'>

            <h1>Cart</h1>
            <h2>Cart Id: {cart.id && cart.id}</h2>
            <h3>User Id: {cart.userId && cart.userId}</h3>
            <h3>Total Price: {`$${totalPrice()}`}</h3>
            
            <button 
                className='btn btn-danger mr-2'
                onClick={handleCartClear}
            >Clear Cart</button>

            <Link 
                to='/checkout' 
                className='btn btn-success ml-2'
            >Checkout</Link>

            
            {cart.products.map(product => {
                return (
                    <CartItem product={product} />
                )
            })} 
            
               
        </div>
    );
};
