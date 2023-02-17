const express = require('express');
const cartRouter = express.Router();
const cartService = require('../services/cartService');
const checkoutService = require('../services/checkoutService');


cartRouter.get('/', cartService.getByUserId);

cartRouter.get('/id/:id', cartService.getById);

cartRouter.post('/', cartService.create);

/* update user cart */
cartRouter.post('/addItem', cartService.addItem);
cartRouter.put('/deleteItem', cartService.deleteItem);
cartRouter.put('/updateQuantity', cartService.updateQuantity);

cartRouter.delete('/clearCart', cartService.clearCart)


cartRouter.post('/checkout', checkoutService);


module.exports = cartRouter;
