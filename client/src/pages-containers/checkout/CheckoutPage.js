import './CheckoutPage.css';
import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectCart, selectCartLoading, selectCartError } from '../../store/cart/cartSlice';
import { checkout } from '../../store/cart/cartActions';
import { AddAddressForm } from '../../components/addAddressForm/AddAddressForm';
import { PickAddressForm } from '../../components/pickAddressForm/PickAddressForm';
import { AddressCard } from '../../components/addressCard/AddressCard';
import StripeCheckout from 'react-stripe-checkout';


export const CheckoutPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectCartLoading);
    const hasError = useSelector(selectCartError);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const [ addressId, setAddressId ] = useState(null);
    

    //WILL AT TIMES HAVE A LOT OF DECIMAL PLACES, MUST STOP AT TWO
    const totalPrice = () => {
        const total = cart.products.map((product) => {
            const currency = product.productPrice;
            const number = Number(currency.replace(/[^0-9.-]+/g,""));

            return number * product.quantity;
        }).reduce((x, y) => x + y); 

        return total;
    };
    //WILL AT TIMES HAVE A LOT OF DECIMAL PLACES, MUST STOP AT TWO


    //STRIPE TOKEN FUNCTION
    const onToken = (token) => {
        fetch('/save-stripe-token', {
          method: 'POST',
          body: JSON.stringify(token),
        }).then(response => {
          response.json().then(data => {
            alert(`We are in business, ${data.email}`);
          });
        });
    };
    //NEED TO LEARN MORE ABOUT THIS AND STRIPE IN GENERAL


    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        )
    };

    if (cart.products.length === 0) {
        return (
            <div className='col-12 mt-3'>
                <h1>Cart Empty</h1>
            </div>
        )
    };

    if (isLoading) {
        return (
            <div className='col-12 mt-3'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError) {
        return (
            <div className='col-12 mt-3'>
                <h1>Error Occurred</h1>
                <Link to='/cart' >Return to Cart</Link>
            </div>
        )
    };

    if (!addressId) {
        return (
            <div className='col-12'>
                <h1>Add Address Info</h1>
                <AddAddressForm setAddressId={setAddressId}/>
                <PickAddressForm setAddressId={setAddressId}/>
            </div>
        );
    };

    return (
        <div className='col-12 mt-3'>

            <h1>Checkout</h1>
            <h2>Total Price: {totalPrice()}</h2>

            <div id='checkout'>
                <AddressCard addressId={addressId}/>
           
                <StripeCheckout
                    className='mt-3'
                    token={onToken}
                    stripeKey="pk_test_51MqkuaGpogIECJKF83s5CMVhGSQ7wHft7QywDnDSEuUzyHnVRsBw16sK09e3KXeNXFhsruTtcrDzJZpXv8KacE2s00jGjNrJIj"
                >
                    <button className="btn btn-success">Pay With Card</button>
                </StripeCheckout>
            
                <button 
                    className='mt-3 btn btn-danger'
                    onClick={ ()=>{

                        dispatch(checkout({
                            totalPrice: totalPrice(), 
                            addressId: addressId, 
                        }));

                        setAddressId(null);
                    } }
                >Checkout!!!</button>
            
                <button
                    className='mt-3 btn btn-secondary'
                    onClick={ () => setAddressId(null) }
                >Go Back</button>
            </div>

        </div>
    );
};
