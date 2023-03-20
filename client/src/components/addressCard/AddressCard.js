import './AddressCard.css';
import React, { useState, useEffect } from 'react';

import addressesApi from '../../api/addressesApi';


export const AddressCard = (props) => {
    const { addressId } = props;
    const [ address, setAddress ] = useState({});


    useEffect(() => {
        addressesApi.getById(addressId).then(response => {
            setAddress(response);
        });
    }, [addressId]);


    return (
        <div className='address-card col-6 col-md-3 mx-auto border border-secondary'>
            <h2>Address ID: {address.id}</h2>

            { address.name && <p>{address.name}</p> }
            <p>{address.line1}</p>
            { address.line2 && <p>{address.line2}</p> }
            <p>{address.city},{address.state && <span> {address.state}</span>} {address.zipCode}</p>
            <p>{address.country}</p>

        </div>
    );
};
