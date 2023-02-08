const ordersMod = require('../models/ordersModel');
const orderItemsMod = require('../models/orderItemsModel');


const ordersService = {
    //GET
    async getByUserId(req, res, next) {
        try {

            const userId = req.user.id;
            const ordersResult = await ordersMod.getByUserId(userId);
            const orders = [];

            for (let i=0; i < ordersResult.length; i++) {
                const orderItemsResult = await orderItemsMod.getItemsByOrderId(ordersResult.rows[i].id);
                const products = [];

                orderItemsResult.rows.forEach(row => products.push({
                    productId: row.product_id, 
                    productName: row.product_name,
                    quantity: row.quantity})
                );

                const order = {
                    id: ordersResult.rows[i].id,
                    userId: ordersResult.rows[i].user_id,
                    totalPrice: ordersResult.rows[i].total_price,
                    shipStatus: ordersResult.rows[i].ship_status,
                    products: products
                };

                orders.push(order);
            };

            res.status(200).json({ data: orders });
        
        } catch(err) {
            next(err);
        };
    },

    async searchById(req, res, next) {
        try {
    
            const id = Number(req.params.id);
        
        } catch(err) {
            next(err);
        };
    },

    async searchByUserId(req, res, next) {
        try {
    
            const userId = Number(req.params.id);
        
        } catch(err) {
            next(err);
        };
    },

    //PUT
    async update(req, res, next) {
        try {
    
            const id = Number(req.params.id);
        
        } catch(err) {
            next(err);
        };
    },

    //DELETE
    async delete(req, res, next) {
        try {
    
            const id = Number(req.params.id);
        
        } catch(err) {
            next(err);
        };
    },

};


module.exports = ordersService;
