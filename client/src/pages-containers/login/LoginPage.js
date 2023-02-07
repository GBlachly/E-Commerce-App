import './LoginPage.css';
import React from 'react'; 


export const LoginPage = () => {

    return (
        <div className='col-12'>

            <h1>Login</h1>

            <div className='login'>
                <form> 
                    <section>
                        <label for='usernameInput'>Username</label>
                        <input 
                            id='usernameInput'
                            name='username'
                            type='text'
                            value='{}' 
                        />
                    </section>
                    
                    <section>
                        <label for='passwordInput'>Password</label>
                        <input 
                            id='passwordInput'
                            name='password'
                            type='password'
                            value='{}'    
                        />
                    </section>
                    
                    <button type='submit'>Submit</button>
                </form>
            </div>

        </div>
    );
};
