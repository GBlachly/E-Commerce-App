import './ProductPage.css';
import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectProducts } from '../../store/products/productsSlice';
import { addCartItem } from '../../store/cart/cartActions';


export const ProductPage = () => {
    const { index } = useParams();
    const i = Number(index);
    const products = useSelector(selectProducts);
    const product = products[i];

    const [ quantity, setQuantity ] = useState(0);
    const dispatch = useDispatch();


    const handleClick = () => {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };

        dispatch(addCartItem(data))

        setQuantity(0);
    };


    return (
        <div className='col-12'>

            <h1>Product</h1>

            <div className='product'>
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>Index: {index}</p>

                <input 
                    type='number'
                    min='0'
                    max={product.stock}
                    name='quantity'
                    value={quantity}
                    onChange={ (e)=>{setQuantity(e.target.value)} }
                />

                <button onClick={handleClick} >Add to Cart</button>
            </div>

        </div>
    );
};
