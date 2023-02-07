import './RegisterPage.css';
import React from 'react'; 


export const RegisterPage = () => {

    return (
        <div className='col-12'>

            <h1>Register</h1>
            
            <div className='register'>
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
                        <label for='emailInput'>Email</label>
                        <input 
                            id='emailInput' 
                            name='email' 
                            type='text' 
                            value='{}' />
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
