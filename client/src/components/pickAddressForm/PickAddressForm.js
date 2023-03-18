import './PickAddressForm.css';
import React, { useState, useEffect } from 'react';

import addressesApi from '../../api/addressesApi';


export const PickAddressForm = (props) => {
    const { setAddressId } = props;

    const [ addresses, setAddresses ] = useState([]);
    const [ selectedAddressId, setSelectedAddressId] = useState(null);
    const [ apiError, setApiError ] = useState(false);


    useEffect(() => {
        setAddresses([]);
        setSelectedAddressId(null);
        setApiError(false);

        addressesApi.getByUserId().then(response => {
            setApiError(false);
            setAddresses(response);
        }).catch(err => setApiError(true));

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setAddressId(selectedAddressId);
    };


    if (addresses.length === 0) {
        return (
            <div className='col-12 mt-3'>
                <h1>Use a Previous Address</h1>
                <h2>No Saved Addresses</h2>
            </div>
        );
    };

    if (apiError) {
        return (
            <div className='col-12 mt-3'>
                <h1>Use a Previous Address</h1>
                <h2>API Error Occurred</h2>
            </div>
        );
    };

    return (
        <div className='row'>

            <form 
                className='col-12 mx-auto' 
                onChange={(e)=>setSelectedAddressId(e.target.value)} 
                onSubmit={handleSubmit}
            >
                <h1>Use a Previous Address</h1>

                {addresses.map((address, index) => {
                    return (
                        <section className=''>
                            
                            <input 
                                id='saved-user-addresses'
                                className=''
                                type='radio'
                                name='user-addresses'
                                value={address.id}
                            />
                            <label for='saved-user-addresses' className='d-flex justify-content-around' >
                                <h2>Address {index + 1}</h2>
                                <p>{address.id}</p>
                                {address.name && <p>{address.name}</p>}
                                <p>{address.line1}</p>
                                {address.line2 && <p>{address.line2}</p>}
                                <p>{address.city}</p>
                                {address.state && <p>{address.state}</p>}
                                <p>{address.country}</p>
                                <p>{address.zipCode}</p>
                            </label>
                                
                        </section>
                    );
                })}

                <input type='submit' value='Submit' />
            </form>

        </div>
    );
};
