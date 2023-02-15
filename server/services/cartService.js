const cartsMod = require('../models/cartsModel');
const cartItemsMod = require('../models/cartItemsModel');


const cartService = {
    //POST
    async create(req, res, next) {
        try {
    
            const userId = req.user.id;
            const { totalPrice, products } = req.body;

            const cartResult = await cartsMod.create({ userId, totalPrice });

            const addedProducts = [];
            products.forEach(async (product) => {
                const data = {
                    cartId: cartResult.id,
                    productId: product.id,
                    productName: product.name,
                    quantity: product.quantity
                };

                const cartItemsResult = await cartItemsMod.addItem(data);

                addedProducts.push({
                    productId: cartItemsResult.product_id,
                    productName: cartItemsResult.product_name,
                    quantity: cartItemsResult.quantity
                });
            });

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: addedProducts
            };

            res.status(200).json({ data: cart });

        } catch(err) {
            next(err);
        };
    },

    //GET
    async getByUserId(req, res, next) {
        try {
    
            const userId  = req.user.id;
            const cartResult = await cartsMod.getByUserId(userId);
            const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);

            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: products
            };

            res.status(200).json({ data: cart })
        
        } catch(err) {
            next(err);
        };
    },

    async getById(req, res, next) {
        try {
    
            const id = Number(req.params.id);
            const cartResult = await cartsMod.getById(id)
            const cartItemsResult = await cartItemsMod.getItemsByCartId(id);

            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: products
            };

            res.status(200).json({ data: cart })
        
        } catch(err) {
            next(err);
        };
    },

    //UPDATE ( POST/PUT/DELETE )
    async addItem(req, res, next) {
        try {

            const userId = req.user.id;
            const { totalPrice, product } = req.body;
            const cartResult = await cartsMod.update({ userId, totalPrice });

            const data = {
                cartId: cartResult.id,
                productId: product.id,
                productName: product.name,
                quantity: product.quantity
            };
            const cartItemsResult = await cartItemsMod.addItem(data);

            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: products
            };

            res.status(200).json({ data: cart })
        
        } catch(err) {
            next(err);
        };
    },

    async deleteItem(req, res, next) {
        try {

            const { totalPrice, productId } = req.body;
            const userId = req.user.id;
            
            const cartResult = await cartsMod.update({ userId, totalPrice });

            const data = {
                cartId: cartResult.id,
                productId: productId,
            };
            const deletedItem = await cartItemsMod.deleteItem(data);

            const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);

            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: products
            };

            res.status(200).json({ data: cart })
        
        } catch(err) {
            next(err);
        };
    },

    async updateQuantity(req, res, next) {
        try {

            const userId = req.user.id;
            const { totalPrice, productId, quantity } = req.body;
            const cartResult = await cartsMod.update({ userId, totalPrice });

            const data = {
                cartId: cartResult.id,
                productId: productId,
                quantity: quantity
            };
            const updatedItem = await cartItemsMod.updateQuantity(data);

            const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);

            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: products
            };

            res.status(200).json({ data: cart });
        
        } catch(err) {
            next(err);
        };
    },

    async clearCart(req, res, next) {
        try {

            const userId = req.user.id;
            const totalPrice = 0; 
            const cartResult = await cartsMod.update({ userId, totalPrice });

            const cartItemResult = await cartItemsMod.deleteAll(cartResult.id);

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                totalPrice: cartResult.total_price,
                products: []
            };

            res.status(200).json({ data: cart });


        } catch(err) {
            next(err);
        };
    },

};


module.exports = cartService;
