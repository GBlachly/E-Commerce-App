import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom'; 


export const Header = () => {

    return (
        <div className='col-12'>
            
            <div className='header'>
                <nav>
                    <ul className='nav'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/login' className='nav-link'>Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/register' className='nav-link'>Register</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-link'>Products</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/account' className='nav-link'>Account</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/orders' className='nav-link'>Orders</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/cart' className='nav-link'>Cart</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/checkout' className='nav-link'>Checkout</Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );

    /*
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
    ); */
};
