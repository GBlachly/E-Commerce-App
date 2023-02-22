import './AccountPage.css';
import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import cartApi from '../../api/cartApi';
import { selectUser, selectAuthError, selectLoggedIn } from '../../store/auth/authSlice';
import { logoutUser } from '../../store/auth/authActions';
import { selectCart, selectGuestCart, selectCartLoading, logoutCart } from '../../store/cart/cartSlice';
import { loadUserCart, replaceCartItems } from '../../store/cart/cartActions';
import { ReplaceCartPrompt } from '../../components/replaceCartPrompt/replaceCartPrompt';


export const AccountPage = () => {
    const loggedIn = useSelector(selectLoggedIn)
    const cartLoading = useSelector(selectCartLoading);
    const authError = useSelector(selectAuthError);
    const user = useSelector(selectUser); 
    const cart = useSelector(selectCart);
    const guestCart = useSelector(selectGuestCart);
    const dispatch = useDispatch();

    const [ userCartHasItems, setUserCartHasItems ] = useState(true);
    

    //CHECK IF USER'S PREVIOUS CART IS EMPTY
    useEffect(() => {
        if (loggedIn && guestCart) {

            cartApi.getByUserId().then((response) => {
                if (!response.products?.length) {
                    setUserCartHasItems(false);
                    return;
                } 
                
                if (response.products?.length) {
                    setUserCartHasItems(true);
                    return;
                };
            }).catch(err => console.log(err));

        };
    }, [loggedIn, guestCart]); 

    
    //LOAD PREVIOUS CART/ REPLACE PREVIOUS CART FUNCTIONS
    const handleCartReplace = () => {
        dispatch(replaceCartItems(cart.products));
        setUserCartHasItems(true);
    };

    const handleCartLoad = () => {
        dispatch(loadUserCart());
        setUserCartHasItems(true);
    };

    
    //IF NOT LOGGED IN/ CART DATA LOADING/ AUTH ERROR (MAYBE ADD CART ERROR TOO)
    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        );
    };

    if (cartLoading) {
        return (
            <div className='col-12'>
                <h1>Loading...</h1>
            </div>
        );
    };

    if (authError.loginErr || authError.registerErr) {    //SHOULD I USE AUTH ERR, OR CART ERR, OR BOTH???
        return (
            <div className='col-12'>
                <h1>Error Occurred</h1>
            </div>
        );
    }; 


    //HANDLE GUEST CART NOT BEING EMPTY DURING USER LOGIN
    if (guestCart && !userCartHasItems) {
        handleCartReplace()
    };

    if (guestCart && userCartHasItems) {
        return (
            <ReplaceCartPrompt handleCartLoad={handleCartLoad} handleCartReplace={handleCartReplace} />
        );
    };

    
    //USER ACCOUNT INFO 
    return (
        <div className='col-12'>
            
            <h1>Account</h1>

            <div className='account'>
                <h2>User ID</h2>
                <h3>{user.id ? user.id : 'User ID Here'}</h3>

                <h2>Username</h2>
                <h3>{user.username ? user.username : 'Username Here'}</h3>

                <h2>User Email</h2>
                <h3>{user.email ? user.email : 'User Email Here'}</h3>

                <button 
                    onClick={()=>{ dispatch(logoutUser()); dispatch(logoutCart()); }} 
                >Logout</button>
            </div>
            
        </div>
    );
};
