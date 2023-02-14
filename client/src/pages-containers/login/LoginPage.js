import './LoginPage.css';
import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';

import { loginUser } from '../../store/auth/authActions';


export const LoginPage = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const dispatch = useDispatch();


    const handleUsernameChange = (event) => {
        const input = event.target.value;
        setUsernameInput(input);
    };

    const handlePasswordChange = (event) => {
        const input = event.target.value;
        setPasswordInput(input); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            username: usernameInput,
            password: passwordInput
        };

        dispatch(loginUser(data));
        //setUsernameInput('');
        //setPasswordInput('');
    };


    return (
        <div className='col-12'>

            <h1>Login</h1>

            <div className='login'>
                <form onSubmit={handleSubmit}> 
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
