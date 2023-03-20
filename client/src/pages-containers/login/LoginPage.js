import './LoginPage.css';
import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { 
    selectLoginUsername, 
    selectLoginPassword,
    handleLoginUsername, 
    handleLoginPassword, 
    clearLoginInputs, 
} from '../../store/user/userSlice';
import { selectLoggedIn, selectAuthError } from '../../store/auth/authSlice';
import { checkLogin, loginUser } from '../../store/auth/authActions';


export const LoginPage = () => {
    const loginUsername = useSelector(selectLoginUsername);
    const loginPassword = useSelector(selectLoginPassword);
    const loggedIn = useSelector(selectLoggedIn);
    const hasError = useSelector(selectAuthError);
    const dispatch = useDispatch();

    
    //Facebook callback will redirect to login page. Login with facebook will add
    //user info the server but not the client.
    //This effect will check to see if session data has stored the user info, 
    //and if so will load the user info into the react store and Navigate to account.
    //The Account page however will not load the "replace prompt cart" even if the user added
    //items to their cart before login. The cart instead will be loaded with their 
    //previous cart info (even if it was previously empty)
    useEffect(() => {
        if (!loggedIn) {
            dispatch(checkLogin());
        }
    }, [loggedIn, dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: loginUsername,
            password: loginPassword,
        };

        dispatch(loginUser(data));
        dispatch(clearLoginInputs());
    };


    if (loggedIn) {
        return (
            <Navigate to='/account' replace={true} />
        )
    };

    return (
        <div className='col-12 mt-3'>

            <h1>Login</h1>
            {hasError.loginErr && <h3>Incorrect Username or Password</h3>}
        
            <div className='row'>
                <div className='col-11 col-lg-4 mx-auto py-3 rounded' id='login'>
                    <form onSubmit={handleSubmit}> 
                        <section>
                            <label 
                                for='usernameInput' 
                                className='w-25 mr-2'
                            >Username</label>
                            <input 
                                id='usernameInput'
                                className='w-50'
                                name='username'
                                type='text'
                                value={loginUsername} 
                                onChange={ (e) => {dispatch(handleLoginUsername(e.target.value))} } 
                            />
                        </section>
                        
                        <section>
                            <label 
                                for='passwordInput'
                                className='w-25 mr-2'
                            >Password</label>
                            <input 
                                id='passwordInput'
                                className='w-50'
                                name='password'
                                type='password'
                                value={loginPassword}
                                onChange={ (e) => {dispatch(handleLoginPassword(e.target.value))} }    
                            />
                        </section>
                        
                        <button type='submit' className='btn btn-danger mt-1'>Submit</button>
                    </form>
                </div>
            </div>

            <h4 className='mt-1'>Or Login Using...</h4>

            <div className='row mb-3'>
                <div className=' col-3 col-lg-4'></div>
                <a 
                    href='http://localhost:4001/api/auth/facebook' 
                    className='col-3 col-lg-2 btn btn-secondary border-light'
                >Facebook</a>

                <button 
                    className='col-3 col-lg-2 btn btn-secondary border-light'
                >Google</button>
                <div className='col-3 col-lg-4'></div>
            </div>

            <h4>Click <Link to='/register'>Here</Link> to Sign up</h4>
        
        </div>
    );
};
