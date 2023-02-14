import './AccountPage.css';
import React from 'react'; 
import { useSelector } from 'react-redux';

import { selectUser, selectIsLoading, selectHasError } from '../../store/auth/authSlice';


export const AccountPage = () => {
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const user = useSelector(selectUser); 


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
            </div>
            
        </div>
    )
};
