import './ProductPage.css';
import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectProducts } from '../../store/products/productsSlice';
import { selectCart, loggedOutItemAdd } from '../../store/cart/cartSlice';
import { addCartItem, updateCartItemQuantity } from '../../store/cart/cartActions';
import { selectLoggedIn } from '../../store/auth/authSlice';


export const ProductPage = () => {
    const { index } = useParams();
    const i = Number(index);
    const products = useSelector(selectProducts);
    const product = products[i];

    const loggedIn = useSelector(selectLoggedIn);
    const cart = useSelector(selectCart);

    const [ quantity, setQuantity ] = useState(0);
    const [ notEnoughStock, setNotEnoughStock ] = useState(false);
    const dispatch = useDispatch();


    const handleClick = () => {
        setNotEnoughStock(false);

        if (quantity > product.stock) {
            setNotEnoughStock(true);
            setQuantity(0);
            return;
        };

        if (product.stock <= 0) {
            return;
        };

        if (quantity <= 0) {
            return;
        };
        
        if (!loggedIn) {
            const data = {
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productUrl: product.url,
                quantity: quantity
            };

            dispatch(loggedOutItemAdd(data))
        };

        if (loggedIn) {
            const foundIndex = cart.products.findIndex(cartProduct => cartProduct.productId === product.id);

            if (foundIndex === -1) {
                const data = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    url: product.url,
                    quantity: quantity
                };
    
                dispatch(addCartItem(data));
            } else {
                const data = {
                    productId: product.id,
                    quantity: quantity
                };
    
                dispatch(updateCartItemQuantity(data));
            };
        };

        setQuantity(0);
    };


    return (
        <div className='col-12 mt-3'>

            <h1>Product</h1>

            <div className='product'>
                <img 
                    src={product.url} 
                    alt='product' 
                />
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p className='w-50 mx-auto'>{product.description}</p>
                <p>{product.price}</p>
                <p>Index: {index}</p>

                {product.stock <= 0 && <p>Out of Stock</p>}
                {notEnoughStock && <p>Not Enough Stock</p>}

                <input 
                    type='number'
                    min='0'
                    max={product.stock}
                    name='quantity'
                    value={quantity}
                    onChange={ (e)=>{setQuantity(e.target.value/1)} }
                />

                <button 
                    onClick={handleClick}
                >Add to Cart</button>
            </div>

        </div>
    );
};
