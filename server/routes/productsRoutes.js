const express = require('express');
const productsRouter = express.Router(); 
const ps = require('../services/productsService');


productsRouter.get('/', ps.getAll);

productsRouter.get('/id/:id', ps.getById);

productsRouter.get('/name/:name', );

//ADMIN ROUTES
productsRouter.post('/', );

productsRouter.put('/id/:id', );

productsRouter.delete('/id/:id', );


module.exports = productsRouter;