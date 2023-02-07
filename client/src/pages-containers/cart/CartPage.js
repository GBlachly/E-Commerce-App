import './CartPage.css';
import React from 'react'; 
import { CartItem } from '../../components/cartItem/CartItem';


export const CartPage = () => {
    const cart = {
        id: 111, 
        userId: 1, 
        totalPrice: 199.99, 
        products: [
            {productId: 1, productName: 'Lamp', quantity: 1},
            {productId: 2, productName: 'Desk', quantity: 2}
        ]
    };


    return (
        <div className='col-12'>

            <h1>Cart</h1>

            <div className='cart'>
                <h2>Cart Id: {cart.id}</h2>
                <h3>User Id: {cart.userId}</h3>
                <h3>Total Price: {cart.totalPrice}</h3>
            
                <div className='cart-items'>
                    {cart.products.map(product => {
                        return (
                            <CartItem product={product} />
                        )
                    })} 
                </div>
            </div>
                
        </div>
    );
};
