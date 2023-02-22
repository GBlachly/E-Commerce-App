import './RegisterPage.css';
import React from 'react'; 
import { Navigate } from 'react-router-dom';
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
import { selectLoggedIn, selectHasError } from '../../store/auth/authSlice';
import { registerUser } from '../../store/auth/authActions';
import { selectCart, turnOffGuestCart } from '../../store/cart/cartSlice';


export const RegisterPage = () => {
    const registerUsername = useSelector(selectRegisterUsername);
    const registerPassword = useSelector(selectRegisterPassword);
    const registerEmail = useSelector(selectRegisterEmail);
    const hasError = useSelector(selectHasError);
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
        <div className='col-12'>

            <h1>Register</h1>
            {hasError.registerErr && <h2>Username or Email Already Exists</h2>}
            
            <div className='register'>
                <form onSubmit={handleSubmit} >
                    <section>
                        <label for='usernameInput'>Username</label>
                        <input 
                            id='usernameInput'
                            name='username'
                            type='text'
                            value={registerUsername}
                            onChange={ (e) => {dispatch(handleRegisterUsername(e.target.value))} } 
                        />
                    </section> 

                    <section>
                        <label for='emailInput'>Email</label>
                        <input 
                            id='emailInput' 
                            name='email' 
                            type='text' 
                            value={registerEmail}
                            onChange={ (e) => {dispatch(handleRegisterEmail(e.target.value))} }
                        />
                    </section>

                    <section>
                        <label for='passwordInput'>Password</label>
                        <input 
                            id='passwordInput'
                            name='password'
                            type='password'
                            value={registerPassword}
                            onChange={ (e) => {dispatch(handleRegisterPassword(e.target.value))} }   
                        />
                    </section>

                    <button type='submit'>Submit</button>
                </form>
            </div>

        </div>
    );
};
