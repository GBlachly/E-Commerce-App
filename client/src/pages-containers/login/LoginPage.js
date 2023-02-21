import './LoginPage.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { 
    selectLoginUsername, 
    selectLoginPassword,
    handleLoginUsername, 
    handleLoginPassword, 
    clearLoginInputs, 
} from '../../store/user/userSlice';
import { selectLoggedIn, selectHasError } from '../../store/auth/authSlice';
import { loginUser } from '../../store/auth/authActions';


export const LoginPage = () => {
    const loginUsername = useSelector(selectLoginUsername);
    const loginPassword = useSelector(selectLoginPassword);
    const loggedIn = useSelector(selectLoggedIn);
    const hasError = useSelector(selectHasError);
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
        <div className='col-12'>

            <h1>Login</h1>
            {hasError.loginErr && <h2>Incorrect Username or Password</h2>}

            <div className='login'>
                <form onSubmit={handleSubmit}> 
                    <section>
                        <label for='usernameInput'>Username</label>
                        <input 
                            id='usernameInput'
                            name='username'
                            type='text'
                            value={loginUsername} 
                            onChange={ (e) => {dispatch(handleLoginUsername(e.target.value))} } 
                        />
                    </section>
                    
                    <section>
                        <label for='passwordInput'>Password</label>
                        <input 
                            id='passwordInput'
                            name='password'
                            type='password'
                            value={loginPassword}
                            onChange={ (e) => {dispatch(handleLoginPassword(e.target.value))} }    
                        />
                    </section>
                    
                    <button type='submit'>Submit</button>
                </form>
            </div>

        </div>
    );
};
