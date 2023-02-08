const express = require('express');
const productsRouter = express.Router(); 
const productsService = require('../services/productsService');


productsRouter.get('/', productsService.getAll);     //add 'search' query to search products by name

productsRouter.get('/id/:id', productsService.getById);

//productsRouter.get('/name/:name', );  //add 'search' query to top route instead of this

//ADMIN ROUTES
productsRouter.post('/', productsService.create);

productsRouter.put('/id/:id', productsService.update);

productsRouter.delete('/id/:id', productsService.delete);


module.exports = productsRouter;
