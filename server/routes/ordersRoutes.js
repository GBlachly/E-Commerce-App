const express = require('express');
const ordersRouter = express.Router(); 
const ordersService = require('../services/ordersService');


ordersRouter.get('/', ordersService.getByUserId);

//ADMIN ROUTES
ordersRouter.get('/id/:id', ordersService.getById);        //get a single order by order Id

ordersRouter.get('/user/:id', ordersService.getByUserId);      //get all orders for a user Id

ordersRouter.put('/id/:id', ordersService.update);

ordersRouter.delete('/id/:id', ordersService.delete);


module.exports = ordersRouter;
