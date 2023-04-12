const express = require('express');
const stripeRouter = express.Router(); 
const stripe = require("stripe")('pk_test_51MqkuaGpogIECJKF83s5CMVhGSQ7wHft7QywDnDSEuUzyHnVRsBw16sK09e3KXeNXFhsruTtcrDzJZpXv8KacE2s00jGjNrJIj');


stripeRouter.post('/create-payment-intent', (req, res, next) => {

});


module.exports = stripeRouter; 