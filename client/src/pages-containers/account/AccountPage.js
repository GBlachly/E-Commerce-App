import './AccountPage.css';
import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectUser, selectLoggedIn, selectIsLoading, selectHasError } from '../../store/auth/authSlice';
import { logoutUser } from '../../store/auth/authActions';
import { selectGuestCart, logoutCart } from '../../store/cart/cartSlice';
import { ReplaceCartPrompt } from '../../components/replaceCartPrompt/replaceCartPrompt';


export const AccountPage = () => {
    const loggedIn = useSelector(selectLoggedIn)
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const user = useSelector(selectUser); 
    const guestCart = useSelector(selectGuestCart);
    const dispatch = useDispatch();

    const [ showPrompt, setShowPrompt ] = useState(true);
    

    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        )
    };

    if (isLoading) {
        return (
            <div className='col-12'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError.loginErr || hasError.registerErr) {
        return (
            <div className='col-12'>
                <h1>Error Occurred</h1>
            </div>
        )
    }; 

    return (
        <div className='col-12'>
            
            <h1>Account</h1>

            { showPrompt && guestCart ? <ReplaceCartPrompt toggleShowPrompt={setShowPrompt}/> : null }

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
    )
};
