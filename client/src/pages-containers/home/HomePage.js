import './HomePage.css';
import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';

import { loadAllProducts } from '../../store/products/productsActions';


export const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllProducts());
        
    }, [dispatch]); 


    return (
        <div className='col-12'>

            <h1>Home</h1>

            <div className='home'></div>

        </div>
    );
};
