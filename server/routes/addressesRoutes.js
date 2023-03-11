const express = require('express');
const addressesRouter = express.Router(); 
const addressesService = require('../services/addressesService');


addressesRouter.get('/', addressesService.getByUserId);

addressesRouter.post('/', addressesService.create);


module.exports = addressesRouter