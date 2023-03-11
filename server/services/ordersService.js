const ordersMod = require('../models/ordersModel');
const orderItemsMod = require('../models/orderItemsModel');
const addressesMod = require('../models/addressesModel');


const ordersService = {
    //GET
    async getByUserId(req, res, next) {
        try {

            let userId;

            if (req.params.id) {
                userId = Number(req.params.id);
            } else {
                userId = req.user.id;
            };

            const ordersResult = await ordersMod.getByUserId(userId);
            const orders = [];

            for (let i=0; i < ordersResult.length; i++) {

                const addressResult = await addressesMod.getById(ordersResult[i].address_id);
                let address = {};
                if (addressResult) {
                    address = {
                        id: addressResult.id,
                        userId: addressResult.user_id,
                        name: addressResult.name,
                        line1: addressResult.line_1,
                        line2: addressResult.line_2,
                        city: addressResult.city,
                        state: addressResult.state,
                        country: addressResult.country,
                        zipCode: addressResult.zip_code,
                    };
                };
                
                const orderItemsResult = await orderItemsMod.getItemsByOrderId(ordersResult[i].id);
                
                const products = [];
                orderItemsResult.forEach(item => products.push({
                    productId: item.product_id, 
                    productName: item.product_name,
                    productPrice: item.product_price,
                    productUrl: item.product_url,
                    quantity: item.quantity})
                );

                const order = {
                    id: ordersResult[i].id,
                    userId: ordersResult[i].user_id,
                    totalPrice: ordersResult[i].total_price,
                    shipStatus: ordersResult[i].ship_status,
                    address: address,
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
            const orderResult = await ordersMod.getById(id);
            
            const addressResult = await addressesMod.getById(orderResult.address_id);
            const address = {
                id: addressResult.id,
                userId: addressResult.user_id,
                name: addressResult.name,
                line1: addressResult.line_1,
                line2: addressResult.line_2,
                city: addressResult.city,
                state: addressResult.state,
                country: addressResult.country,
                zipCode: addressResult.zip_code,
            };
            
            const orderItemsResult = await orderItemsMod.getItemsByOrderId(id);
            const products = [];
            orderItemsResult.forEach(item => products.push({
                productId: item.product_id,
                productName: item.product_name,
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const order = {
                id: id,
                userId: orderResult.user_id,
                totalPrice: orderResult.total_price,
                shipStatus: orderResult.ship_status,
                address: address,
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
            const { category, update/*, products*/ } = req.body;
            const orderResult = await ordersMod.update({ id, category, update });
            
            /*
            const updatedProducts = [];
            products.forEach(async (product) => {
                const updatedProduct = await orderItemsMod.update({
                    orderId: orderResult.id,
                    productId: product.id,
                    quantity: product.quantity,
                });

                const updatedProductObj = {
                    productId: updatedProduct.product_id,
                    productName: updatedProduct.product_name,
                    productPrice: updatedProduct.product_price,
                    productUrl: updatedProduct.product_url,
                    quantity: updatedProduct.quantity
                };

                updatedProducts.push(updatedProductObj);
            });
            */

            const updatedOrder = {
                id: id,
                userId: orderResult.user_id,
                totalPrice: orderResult.total_price,
                shipStatus: orderResult.ship_status,
                addressId: orderResult.address_id,
                //products: updatedProducts
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
                productPrice: item.product_price,
                productUrl: item.product_url,
                quantity: item.quantity
            }));

            const deletedOrder = {
                id: id,
                userId: orderResult.user_id,
                totalPrice: orderResult.total_price,
                shipStatus: orderResult.ship_status,
                addressId: orderResult.address_id,
                products: deletedProducts
            };

            res.status(200).json({ data: deletedOrder });
        
        } catch(err) {
            next(err);
        };
    },

};


module.exports = ordersService;
