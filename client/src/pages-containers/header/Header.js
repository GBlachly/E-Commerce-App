import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom'; 


export const Header = () => {

    return (
        <div className='col-12'>
            
            <div className='header'>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                        <li>
                            <Link to='/products'>Products</Link>
                        </li>
                        <li>
                            <Link to='/account'>Account</Link>
                        </li>
                        <li>
                            <Link to='/orders'>Orders</Link>
                        </li>
                        <li>
                            <Link to='/cart'>Cart</Link>
                        </li>
                        <li>
                            <Link to='/checkout'>Checkout</Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};
