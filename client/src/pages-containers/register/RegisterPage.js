import './RegisterPage.css';
import React from 'react'; 
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { 
    selectRegisterUsername,
    selectRegisterEmail,
    selectRegisterPassword,
    handleRegisterUsername, 
    handleRegisterEmail,
    handleRegisterPassword, 
    clearRegisterInputs,    
} from '../../store/user/userSlice';
import { selectLoggedIn, selectAuthError } from '../../store/auth/authSlice';
import { registerUser } from '../../store/auth/authActions';
import { selectCart, turnOffGuestCart } from '../../store/cart/cartSlice';


export const RegisterPage = () => {
    const registerUsername = useSelector(selectRegisterUsername);
    const registerPassword = useSelector(selectRegisterPassword);
    const registerEmail = useSelector(selectRegisterEmail);
    const hasError = useSelector(selectAuthError);
    const loggedIn = useSelector(selectLoggedIn);
    const cart = useSelector(selectCart); 
    const dispatch = useDispatch();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: registerUsername,
            email: registerEmail,
            password: registerPassword,
            cartProducts: cart.products,
        };

        dispatch(turnOffGuestCart());
        dispatch(registerUser(data));
        dispatch(clearRegisterInputs());
    };


    if (loggedIn) {
        return (
            <Navigate to='/account' replace={true} />
        )
    };

    return (
        <div className='col-12 mt-3'>

            <h1>Register</h1>
            {hasError.registerErr && <h3>Username or Email Already Exists</h3>}
            
            <div className='row'>
                <div className='col-11 col-lg-4 mx-auto py-3 rounded' id='register'>
                    <form onSubmit={handleSubmit} >
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
                                value={registerUsername}
                                onChange={ (e) => {dispatch(handleRegisterUsername(e.target.value))} } 
                            />
                        </section> 

                        <section>
                            <label 
                                for='emailInput'
                                className='w-25 mr-2'
                            >E-mail</label>
                            <input 
                                id='emailInput' 
                                className='w-50'
                                name='email' 
                                type='text' 
                                value={registerEmail}
                                onChange={ (e) => {dispatch(handleRegisterEmail(e.target.value))} }
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
                                value={registerPassword}
                                onChange={ (e) => {dispatch(handleRegisterPassword(e.target.value))} }   
                            />
                        </section>

                        <button type='submit' className='btn btn-danger mt-1'>Submit</button>
                    </form>
                </div>
            </div>

            <h4 className='mt-1'>Or Register Using...</h4>

            <div className='row mb-3'>
                <div className='col-3 col-lg-4'></div>
                
                <a 
                    href='http://localhost:4001/api/auth/facebook' 
                    className='col-3 col-lg-2 btn btn-secondary border-light'
                >Facebook</a>

                <a 
                    href='http://localhost:4001/api/auth/google' 
                    className='col-3 col-lg-2 btn btn-secondary border-light'
                >Google</a>

                <div className='col-3 col-lg-4'></div>
            </div>

            <h4>Click <Link to='/login'>Here</Link> to Login</h4>

        </div>
    );
};
