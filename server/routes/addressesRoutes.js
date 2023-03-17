const express = require('express');
const addressesRouter = express.Router(); 
const addressesService = require('../services/addressesService');


addressesRouter.get('/', addressesService.getByUserId);

addressesRouter.get('/id/:id', addressesService.getById);

addressesRouter.post('/', addressesService.create);

//ADMIN ROUTES
addressesRouter.get('/user/:userId', addressesService.getByUserId);


module.exports = addressesRouter