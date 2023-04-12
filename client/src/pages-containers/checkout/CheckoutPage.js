import './CheckoutPage.css';
import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectCart, selectCartLoading, selectCartError } from '../../store/cart/cartSlice';
import { checkout } from '../../store/cart/cartActions';
import { AddAddressForm } from '../../components/addAddressForm/AddAddressForm';
import { PickAddressForm } from '../../components/pickAddressForm/PickAddressForm';
import { AddressCard } from '../../components/addressCard/AddressCard';

//STRIPE IMPORTS TO BE USED WITH CHECKOUTFORMSTRIPE COMPONENT
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutFormStripe } from '../../components/checkoutFormStripe/CheckoutFormStripe'
const stripePromise = loadStripe('pk_test_51MqkuaGpogIECJKF83s5CMVhGSQ7wHft7QywDnDSEuUzyHnVRsBw16sK09e3KXeNXFhsruTtcrDzJZpXv8KacE2s00jGjNrJIj');
//----


export const CheckoutPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectCartLoading);
    const hasError = useSelector(selectCartError);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const [ addressId, setAddressId ] = useState(null);
    

    //STRIPE CODE TO USE WITH @stripe/stripe-js + @stripe/react-stripe-js
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:4001/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
    //----


    //WILL AT TIMES HAVE A LOT OF DECIMAL PLACES, MUST STOP AT TWO
    const totalPrice = () => {
        const total = cart.products.map((product) => {
            const currency = product.productPrice;
            const number = Number(currency.replace(/[^0-9.-]+/g,""));

            return number * product.quantity;
        }).reduce((x, y) => x + y); 

        return total;
    };
    //----


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
           
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutFormStripe />
                    </Elements>
                )}
            
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



/* PARTIAL CODE TO USE WITH REACT-STRIPE-CHECKOUT-PACKAGE
    import StripeCheckout from 'react-stripe-checkout';
    
    ...

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
    
    ...

    return (
        <StripeCheckout
            className='mt-3'
            token={onToken}
            stripeKey="pk_test_51MqkuaGpogIECJKF83s5CMVhGSQ7wHft7QywDnDSEuUzyHnVRsBw16sK09e3KXeNXFhsruTtcrDzJZpXv8KacE2s00jGjNrJIj"
        >
            <button className="btn btn-success">Pay With Card</button>
        </StripeCheckout>
    )
*/