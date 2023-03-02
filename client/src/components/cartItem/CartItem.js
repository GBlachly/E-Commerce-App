import './CartItem.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectProducts } from '../../store/products/productsSlice'
import { loggedOutItemDelete } from '../../store/cart/cartSlice';
import { deleteCartItem } from '../../store/cart/cartActions';


export const CartItem = (props) => {
    const { product } = props;
    const products = useSelector(selectProducts);
    const index = products.findIndex(item => item.id === product.productId)
    const stock = products[index].stock;
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();


    const handleDelete = () => {
        if (!loggedIn) {
            dispatch(loggedOutItemDelete(product.productId));
        };

        if (loggedIn) {
            dispatch(deleteCartItem(product.productId))
        };
    };

    return (
        <div className='cart-item row my-3'>
            <div className='empty-col col-md-2'></div>
            

            <div className='col-3 col-md-2'>
                <Link to={`/products/${index}`}>
                    <img 
                        src={product.productUrl} 
                        alt='product' 
                        className='w-100 h-auto mw-100 m-3'
                    />
                </Link>
            </div>


            <div className='cart-item-details col-6 col-md-4 mt-3'>
                <p>Product Id: {product.productId}</p>
                <p>Product Name: {product.productName}</p>
                <p>Product Price: {product.productPrice}</p>
                <p>Quantity: {product.quantity}</p>
            </div>


            <div className='col-3 col-md-2'>
                <button 
                    className='cart-item-btns btn btn-secondary d-block mx-auto my-3'
                    onClick={handleDelete}
                >Remove</button>

                <Link to={`/products/${index}`}>
                    <button
                        className='cart-item-btns btn btn-secondary d-block mx-auto my-3'
                    >Edit</button>
                </Link>

                {product.quantity > stock ? <p className='text-danger'>Please Edit Quantity</p> : null}
            </div>


            <div className='empty-col col-md-2'></div>
        </div>
    )
};