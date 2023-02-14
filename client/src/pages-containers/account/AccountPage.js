import './AccountPage.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectUser, selectLoggedIn, selectIsLoading, selectHasError } from '../../store/auth/authSlice';
import { logoutUser } from '../../store/auth/authActions';


export const AccountPage = () => {
    const loggedIn = useSelector(selectLoggedIn)
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const user = useSelector(selectUser); 
    const dispatch = useDispatch();


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

    if (hasError) {
        return (
            <div className='col-12'>
                <h1>Error Occurred</h1>
            </div>
        )
    }; 

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

                <button onClick={() => dispatch(logoutUser())} >Logout</button>
            </div>
            
        </div>
    )
};
