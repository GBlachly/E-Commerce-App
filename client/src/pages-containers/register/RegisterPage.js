import './RegisterPage.css';
import React, { useState } from 'react'; 
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { registerUser } from '../../store/auth/authActions';


export const RegisterPage = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();


    const handleUsernameChange = (event) => {
        const input = event.target.value;
        setUsernameInput(input);
    };

    const handleEmailChange = (event) => {
        const input = event.target.value;
        setEmailInput(input);
    };

    const handlePasswordChange = (event) => {
        const input = event.target.value;
        setPasswordInput(input);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        };

        dispatch(registerUser(data));
        
        setUsernameInput('');
        setEmailInput('');
        setPasswordInput('');
    };


    if (loggedIn) {
        return (
            <Navigate to='/account' replace={true} />
        )
    };

    return (
        <div className='col-12'>

            <h1>Register</h1>
            
            <div className='register'>
                <form onSubmit={handleSubmit} >
                    <section>
                        <label for='usernameInput'>Username</label>
                        <input 
                            id='usernameInput'
                            name='username'
                            type='text'
                            value={usernameInput}
                            onChange={handleUsernameChange} 
                        />
                    </section> 

                    <section>
                        <label for='emailInput'>Email</label>
                        <input 
                            id='emailInput' 
                            name='email' 
                            type='text' 
                            value={emailInput}
                            onChange={handleEmailChange} 
                        />
                    </section>

                    <section>
                        <label for='passwordInput'>Password</label>
                        <input 
                            id='passwordInput'
                            name='password'
                            type='password'
                            value={passwordInput}
                            onChange={handlePasswordChange}    
                        />
                    </section>

                    <button type='submit'>Submit</button>
                </form>
            </div>

        </div>
    );
};
