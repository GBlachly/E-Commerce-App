import './AdminPage.css';
import React from 'react'; 
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLoggedIn, selectUser } from '../../store/auth/authSlice';
import { UpdateProduct } from '../../components/updateProduct/updateProduct';


export const AdminPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const user = useSelector(selectUser);
    
    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        );
    };

    if (!user.admin) {
        return (
            <Navigate to='/account' replace={true} />
        );
    };

    return (
        <div className='col-12'>

            <h1>Admin</h1>

            <UpdateProduct />

        </div>
    );
};