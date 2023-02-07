import './AccountPage.css';
import React from 'react'; 


export const AccountPage = () => {
    const user = {};

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


