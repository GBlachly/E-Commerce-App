import './UpdateOrder.css';
import React, { useState } from 'react';

import ordersApi from '../../api/ordersApi';


export const UpdateOrder = (props) => {
    const { order } = props;
    const [ orderStatus, setOrderStatus ] = useState(order);
    const [ shipStatusInput, setShipStatusInput ] = useState('-');

    const [ updateSuccess, setUpdateSuccess ] = useState(false)
    const [ hasError, setHasError] = useState(false);


    const handleShipStatusSubmit = (e) => {
        e.preventDefault();

        setHasError(false);
        setUpdateSuccess(false);

        if (shipStatusInput === '-') {
            setHasError(true);
            return;
        };

        const data = {
            id: order.id,
            category: 'shipStatus',
            update: shipStatusInput
        };

        ordersApi.update(data).then((response) => {
            if (!response) {
                setHasError(true);
            } else {
                setOrderStatus(response);
                setUpdateSuccess(true);
            }
        }).catch(err => setHasError(true))
    };


    return (
        <div className='row mx-auto my-3 border-bottom border-dark'>
            
            {updateSuccess && <h3 className='col-12 text-success'>Update Successful</h3>}
            {hasError && <h3 className='col-12 text-danger'>Update Failed</h3>}

            <div className='col-6'>
                <h3>Order Id: {orderStatus.id}</h3>
                <h4>User Id: {orderStatus.userId}</h4>
                <h4>Total Price: {orderStatus.totalPrice}</h4>
                <h4>Ship Status: {orderStatus.shipStatus}</h4>
            </div>

            <form className='col-6' onSubmit={handleShipStatusSubmit}>
                <section>
                    <label
                        for='statusUpdateList'
                    >Ship Status</label>
                    <select
                        id='statusUpdateList'
                        name='shipStatus'
                        onChange={ (e) => {setShipStatusInput(e.target.value)} }
                    >
                        <option value='-'>-</option>
                        <option value='Not Yet Shipped'>Not Yet Shipped</option>
                        <option value='Shipped'>Shipped</option>
                        <option value='Delivered'>Delivered</option>
                    </select>
                </section>

                <input type='submit' className= 'btn btn-secondary' value='update'/>
            </form>

        </div>
    );
};
