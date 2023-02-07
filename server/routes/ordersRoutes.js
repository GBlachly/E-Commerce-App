const express = require('express');
const ordersRouter = express.Router(); 


ordersRouter.get('/', );

//ADMIN ROUTES
ordersRouter.get('/id/:id');        //get a single order by order Id

ordersRouter.get('/user/:id');      //get all orders for a user Id

ordersRouter.put('/id/:id', );

ordersRouter.delete('/id/:id', );


module.exports = ordersRouter;
