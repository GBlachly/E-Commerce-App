import './LoginPage.css';
import React from 'react'; 
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
import { loginUser } from '../../store/auth/authActions';


export const LoginPage = () => {
    const loginUsername = useSelector(selectLoginUsername);
    const loginPassword = useSelector(selectLoginPassword);
    const loggedIn = useSelector(selectLoggedIn);
    const hasError = useSelector(selectAuthError);
    const dispatch = useDispatch();


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
                <div className='login col-11 col-lg-4 mx-auto py-3 rounded'>
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
                <button 
                    className='col-3 col-lg-2 btn btn-secondary border-light'
                >Facebook</button>

                <button 
                    className='col-3 col-lg-2 btn btn-secondary border-light'
                >Google</button>
                <div className='col-3 col-lg-4'></div>
            </div>

            <h4>Click <Link to='/register'>Here</Link> to Sign up</h4>
        
        </div>
    );
};
