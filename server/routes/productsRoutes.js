const express = require('express');
const productsRouter = express.Router(); 
const productsService = require('../services/productsService');


productsRouter.get('/', productsService.getAll);     //add 'search' query to search products by name

//productsRouter.get('/name/:name', );  //add 'search' query to top route instead of this 

productsRouter.get('/id/:id', productsService.getById);

//ADMIN ROUTES
productsRouter.post('/', productsService.create);

productsRouter.put('/update/:id', productsService.update)

productsRouter.delete('/delete/:id', productsService.delete);


module.exports = productsRouter;
