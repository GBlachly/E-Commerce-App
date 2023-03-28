import './UpdateProduct.css';
import React, { useState } from 'react';

import productsApi from '../../api/productsApi';


export const UpdateProduct = () => {
    const [productId, setProductId] = useState('');
    const [updateCategory, setUpdateCategory] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');

    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateFailed, setUpdateFailed] = useState(false);
    const [hasError, setHasError] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        setUpdateSuccess(false);
        setUpdateFailed(false);
        setHasError(false);

        const data = {
            id: productId,
            category: updateCategory,
            update: updatedValue
        };

        productsApi.update(data).then((response) => {
            if (!response) {
                setUpdateFailed(true);
            } else {
                setUpdateSuccess(true);
            };
        }).catch(err => setHasError(true));

        setProductId('');
        setUpdateCategory('');
        setUpdatedValue('');
    };

    
    return (
        <div className='row'>

            <div className='col-12'>
                <h2>Update Product Information</h2>
                {updateSuccess && <h3 className='text-success'>Update Successful</h3>}
                {updateFailed && <h3 className='text-danger'>Update Failed</h3>}
                {hasError && <h3 className='text-danger'>Error Occurred</h3>}
            </div>

            <form onSubmit={handleSubmit} className='col-12'>
                <section>
                    <label 
                        for='idInput'
                        className='mr-2'
                    >Product ID</label>
                    <input 
                        id='idInput'
                        type='number'
                        name='id'
                        value={productId}
                        onChange={ (e) => {setProductId(e.target.value)} }
                    />
                </section>

                <section>
                    <label 
                        for='categoryList'
                        className='mr-2'
                    >Information To Update</label>
                    <select 
                        id='categoryList' 
                        name='category' 
                        onChange={ (e) => {setUpdateCategory(e.target.value)} }
                    >   
                        <option value=''>-</option>
                        <option value='name'>Name</option>
                        <option value='price'>Price</option>
                        <option value='stock'>Stock</option>
                        <option value='url'>URL</option>
                        <option value='description'>Description</option>
                    </select>
                </section>

                <section>
                    <label 
                        for='updateValueInput'
                        className='mr-2'
                    >Updated Value</label>
                    <input 
                        id='updateValueInput'
                        type='text'
                        name='updateValue'
                        value={updatedValue}
                        onChange={ (e) => {setUpdatedValue(e.target.value)}}
                    />
                </section>

                <input 
                    type='submit' 
                    className='btn btn-secondary' 
                    value='Update Product'
                />
            </form>

        </div>
    );
};