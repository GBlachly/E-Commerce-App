const cartsMod = require('../models/cartsModel');
const cartItemsMod = require('../models/cartItemsModel');


const cartService = {
    //POST
    async create(req, res, next) {
        try {
    
            const userId = req.user.id;
            const { products } = req.body;

            const cartResult = await cartsMod.create(userId);

            const addedProducts = [];
            products.forEach(async (product) => {
                const data = {
                    cartId: cartResult.id,
                    productId: product.id,
                    productName: product.name,
                    productPrice: product.price,
                    productUrl: product.url,
                    quantity: product.quantity
                };

                const cartItemsResult = await cartItemsMod.addItem(data);

                addedProducts.push({
                    productId: cartItemsResult.product_id,
                    productName: cartItemsResult.product_name,
                    productPrice: cartItemsResult.product_price,
                    productUrl: cartItemsResult.product_url,
                    quantity: cartItemsResult.quantity
                });
            });

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
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

            if (!cartResult) {
                
                res.status(200).json({ data: null });
                return;
            };
            
            const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);

            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                products: products
            };

            res.status(200).json({ data: cart });

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
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                products: products
            };

            res.status(200).json({ data: cart })
        
        } catch(err) {
            next(err);
        };
    },

    //UPDATE ( POST/PUT/DELETE )
    async replace(req, res, next) {
        try {

            const userId = req.user.id;
            const { products } = req.body;

            const cartResult = await cartsMod.getByUserId(userId);
            const deletedCartItems = await cartItemsMod.deleteAll(cartResult.id);


            for (let i = 0; i < products.length; i++) {
                const data = {
                    cartId: cartResult.id,
                    productId: products[i].productId,
                    productName: products[i].productName,
                    productPrice: products[i].productPrice,
                    productUrl: products[i].productUrl,
                    quantity: products[i].quantity
                };

                const addedCartItem = await cartItemsMod.addItem(data);
            };

            
            const newCartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id);

            const newProducts = [];
            newCartItemsResult.forEach((item => {
                const newProduct = {
                    productId: item.product_id,
                    productName: item.product_name,
                    productPrice: item.product_price,
                    productUrl: item.product_url,
                    quantity: item.quantity
                };

                newProducts.push(newProduct);
            }));

            const newCart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                products: newProducts
            };

            res.status(200).json({ data: newCart });

        } catch(err) {
            next(err);
        };
    },

    async addItem(req, res, next) {
        try {

            const userId = req.user.id;
            const { product } = req.body;
            const cartResult = await cartsMod.getByUserId(userId);

            const data = {
                cartId: cartResult.id,
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productUrl: product.url,
                quantity: product.quantity
            };
            const itemAddResult = await cartItemsMod.addItem(data);

            const cartItemsResult = await cartItemsMod.getItemsByCartId(cartResult.id)
 
            const products = [];
            cartItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                products: products
            };

            res.status(200).json({ data: cart })
        
        } catch(err) {
            next(err);
        };
    },

    async deleteItem(req, res, next) {
        try {
            
            const userId = req.user.id;
            const { productId } = req.body;
            
            const cartResult = await cartsMod.getByUserId(userId);

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
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
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
            const { productId, quantity } = req.body;
            const cartResult = await cartsMod.getByUserId(userId);

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
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
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
            const cartResult = await cartsMod.getByUserId(userId);

            const cartItemResult = await cartItemsMod.deleteAll(cartResult.id);

            const cart = {
                id: cartResult.id,
                userId: cartResult.user_id,
                products: []
            };

            res.status(200).json({ data: cart });


        } catch(err) {
            next(err);
        };
    },

};


module.exports = cartService;
