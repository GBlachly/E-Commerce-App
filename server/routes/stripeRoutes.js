require('dotenv').config();
const express = require('express');
const stripeRouter = express.Router(); 
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);


stripeRouter.post('/create-payment-intent', async (req, res, next) => {
    const { totalPrice } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
});


module.exports = stripeRouter; 