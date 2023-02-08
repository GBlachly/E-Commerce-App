const ordersMod = require('../models/ordersModel');
const orderItemsMod = require('../models/orderItemsModel');


const ordersService = {
    //GET
    async getByUserId(req, res, next) {
        try {

            let userId;

            if (req.user) {
                userId = req.user.id;
            };

            if (req.params.id) {
                userId = Number(req.params.id);
            };

            const ordersResult = await ordersMod.getByUserId(userId);
            const orders = [];

            for (let i=0; i < ordersResult.length; i++) {
                
                const orderItemsResult = await orderItemsMod.getItemsByOrderId(ordersResult[i].id);
                
                const products = [];
                orderItemsResult.forEach(item => products.push({
                    productId: item.product_id, 
                    productName: item.product_name,
                    quantity: item.quantity})
                );

                const order = {
                    id: ordersResult[i].id,
                    userId: ordersResult[i].user_id,
                    totalPrice: ordersResult[i].total_price,
                    shipStatus: ordersResult[i].ship_status,
                    products: products
                };

                orders.push(order);
            };

            res.status(200).json({ data: orders });
        
        } catch(err) {
            next(err);
        };
    },

    async getById(req, res, next) {
        try {
    
            const id = Number(req.params.id);
            const orderResult = await ordersMod.searchById(id);
            const orderItemsResult = await orderItemsMod.getItemsByOrderId(id);

            const products = [];
            orderItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const order = {
                id: id,
                userId: orderResult.user_id,
                totalPrice: orderResult.total_price,
                shipStatus: orderResult.ship_status,
                products: products
            };

            res.status(200).json({ data: order })
        
        } catch(err) {
            next(err);
        };
    },

    //PUT
    async update(req, res, next) {
        try {
    
            const id = Number(req.params.id);
            const { totalPrice, shipStatus, products } = req.body;
            const orderResult = await ordersMod.update({ id, totalPrice, shipStatus });
            
            const updatedProducts = [];
            products.forEach(async (product) => {
                const updatedProduct = await orderItemsMod.update(product);

                const updatedProductObj = {
                    productId: updatedProduct.product_id,
                    productName: updatedProduct.product_name,
                    quantity: updatedProduct.quantity
                };

                updatedProducts.push(updatedProductObj);
            });

            const updatedOrder = {
                id: id,
                userId: orderResult.user_id,
                totalPrice: orderResult.total_price,
                shipStatus: orderResult.ship_status,
                products: updatedProducts
            };

            res.status(200).json({ data: updatedOrder });

        } catch(err) {
            next(err);
        };
    },

    //DELETE
    async delete(req, res, next) {
        try {
    
            const id = Number(req.params.id);
            const orderResult = await ordersMod.delete(id);
            const orderItemsResult = await orderItemsMod.delete(id);

            const deletedProducts = [];
            orderItemsResult.forEach(item => deletedProducts.push({
                productId: item.product_id,
                productName: item.product_name,
                quantity: item.quantity
            }));

            const deletedOrder = {
                id: id,
                userId: orderResult.user_id,
                totalPrice: orderResult.total_price,
                shipStatus: orderResult.ship_status,
                products: deletedProducts
            };

            res.status(200).json({ data: deletedOrder });
        
        } catch(err) {
            next(err);
        };
    },

};


module.exports = ordersService;
