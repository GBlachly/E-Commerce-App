import './AddAddressForm.css';
import React, { useState } from 'react';

import addressesApi from '../../api/addressesApi';


export const AddAddressForm = (props) => {
    const { setAddressId } = props;

    const [ nameInput, setNameInput ] = useState('');
    const [ line1Input, setLine1Input ] = useState('');
    const [ line2Input, setLine2Input ] = useState('');
    const [ cityInput, setCityInput ] = useState('');
    const [ stateInput, setStateInput ] = useState('');
    const [ countryInput, setCountryInput ] = useState('');
    const [ zipCodeInput, setZipCodeInput ] = useState('');

    const [ apiError, setApiError ] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setApiError(false)

        const data = {
            name: nameInput,
            line1: line1Input,
            line2: line2Input,
            city: cityInput,
            state: stateInput,
            country: countryInput,
            zipCode: zipCodeInput
        };

        addressesApi.create(data).then(response => {
            setApiError(false);
            setAddressId(response.id);
        }).catch(err => {
            setApiError(true);
        });

        setNameInput('');
        setLine1Input('');
        setLine2Input('');
        setCityInput('');
        setStateInput('');
        setCountryInput('');
        setZipCodeInput('');
    };


    if (apiError) {
        return (
            <div className='col-12 mt-3'>
                <h1>Add an Address</h1>
                <h2>API Error Occurred</h2>
            </div>
        );
    };

    return (
        <div className='row'>
            
            <form className='col-12 mx-auto' onSubmit={handleSubmit}>
                <h1>Add an Address</h1>

                <section>
                    <label
                        for='nameInput'
                        className='mr-2'
                    >Full Name</label>
                    <input 
                        id='nameInput'
                        className=''
                        name='name'
                        type='text'
                        value={nameInput}
                        onChange={ (e) => setNameInput(e.target.value) }
                    />
                </section>

                <section>
                    <label
                        for='line1Input'
                        className='mr-2'
                    >Address Line 1</label>
                    <input 
                        id='line1Input'
                        className=''
                        name='line1'
                        type='text'
                        value={line1Input}
                        onChange={ (e) => setLine1Input(e.target.value) }
                        required
                    />
                </section>

                <section>
                    <label
                        for='line2Input'
                        className='mr-2'
                    >Address Line 2</label>
                    <input 
                        id='line2Input'
                        className=''
                        name='line2'
                        type='text'
                        value={line2Input}
                        onChange={ (e) => setLine2Input(e.target.value) }
                    />
                </section>

                <section>
                    <label
                        for='cityInput'
                        className='mr-2'
                    >City</label>
                    <input 
                        id='cityInput'
                        className=''
                        name='city'
                        type='text'
                        value={cityInput}
                        onChange={ (e) => setCityInput(e.target.value) }
                        required
                    />
                </section>

                <section>
                    <label
                        for='stateInput'
                        className='mr-2'
                    >State</label>
                    <input 
                        id='stateInput'
                        className=''
                        name='state'
                        type='text'
                        value={stateInput}
                        onChange={ (e) => setStateInput(e.target.value) }
                    />
                </section>

                <section>
                    <label
                        for='countryInput'
                        className='mr-2'
                    >Country</label>
                    <input 
                        id='countryInput'
                        className=''
                        name='country'
                        type='text'
                        value={countryInput}
                        onChange={ (e) => setCountryInput(e.target.value) }
                        required
                    />
                </section>

                <section>
                    <label
                        for='zipCodeInput'
                        className='mr-2'
                    >Zip Code</label>
                    <input 
                        id='zipCodeInput'
                        className=''
                        name='zipCode'
                        type='text'
                        value={zipCodeInput}
                        onChange={ (e) => setZipCodeInput(e.target.value) }
                        required
                    />
                </section>

                <input 
                    className='btn btn-secondary'
                    type='submit' 
                    value='Submit' 
                />
            </form>
        </div>
    );
};
