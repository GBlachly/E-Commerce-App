import './updateOrders.css';
import React, { useState } from 'react';

import ordersApi from '../../api/ordersApi';
import { UpdateOrder } from '../../components/updateOrder/updateOrder';


export const UpdateOrders = () => {
    const [ orderIdInput, setOrderIdInput ] = useState('');
    const [ userIdInput, setUserIdInput ] = useState('');
    const [ orders, setOrders ] = useState([]);
    const [ searchErr, setSearchErr ] = useState(false);


    const handleIdSubmit = (e) => {
        e.preventDefault();

        setSearchErr(false);

        ordersApi.getByOrderId(orderIdInput).then((response) => {
            if (!response) {
                setSearchErr(true);
            } else {
                setOrders([response]);
            };
        }).catch(err => setSearchErr(true));

        setOrderIdInput('');
        setUserIdInput('');
    };


    const handleUserIdSubmit = (e) => {
        e.preventDefault();

        setSearchErr(false);

        ordersApi.getByUserId(userIdInput).then((response) => {
            if (!response.length) {
                setSearchErr(true);
            } else {
                setOrders(response);
            };
        }).catch(err => setSearchErr(true));

        setOrderIdInput('');
        setUserIdInput('');
    };


    return (
        <div className='row mt-5'>

            <div className='col-12 my-2'>
                <h2>Update Order Information</h2>
                {searchErr && <h3 className='text-danger'>Error Occurred</h3>}
                <button
                    className='btn btn-danger'
                    onClick={ () => {setOrders([])} }    
                >Clear Search</button>
            </div>
            
            <form className='col-12' onSubmit={handleIdSubmit}>
                <label
                    for='orderIdInput'
                    className='mr-2'
                >Search By Order ID</label>
                <input 
                    type='text' 
                    id='orderIdInput'
                    value={orderIdInput}
                    onChange={ (e) => {setOrderIdInput(e.target.value)} }
                />
                <input type='submit' value='Search'/>
            </form>

            <form className='col-12' onSubmit={handleUserIdSubmit}>
                <label
                    for='userIdInput'
                    className='mr-2'
                >Search By User ID</label>
                <input 
                    type='text' 
                    id='userIdInput'
                    value={userIdInput}
                    onChange={ (e) => {setUserIdInput(e.target.value)} }
                />
                <input type='submit' value='Search'/>
            </form>

            <div className='col-12'>
                {orders.map(order => {
                    return (
                        <UpdateOrder order={order} />
                    )
                })}
            </div>

        </div>
    );
};
