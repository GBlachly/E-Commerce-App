const db = require('../db/db');


const orderItemsMod = {
    //CREATE
    async addItem(data) {
        try {

            const { orderId, productId, productName, quantity } = data;
            const statement = `INSERT INTO orders_products (order_id, product_id, product_name, quantity)
                                VALUES ($1, $2, $3, $4)
                                RETURNING *;`;
            const values = [orderId, productId, productName, quantity];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //READ
    async getItemsByOrderId(orderId) {
        try {

            const statement = `SELECT * FROM orders_products 
                                WHERE order_id = $1;`;
            const values = [orderId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows;
            };
        
            return [];

        } catch(err) {
            throw new Error(err);
        };
    },

    //UPDATE
    async update(data) {
        try {

            const { orderId, productId, quantity } = data;
            const statement = `ALTER TABLE orders_products
                                SET quantity = $3
                                WHERE order_id = $1 AND product_id = $2
                                RETURNING *;`;
            const values = [orderId, productId, quantity];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            };

            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //DELETE
    async deleteItem(data) {
        try {

            const { orderId, productId } = data;
            const statement = `DELETE FROM orders_products
                                WHERE order_id = $1 AND product_id = $2
                                RETURNING *;`;
            const values = [orderId, productId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async deleteAll(orderId) {
        try {

            const statement = `DELETE FROM orders_products
                                WHERE order_id = $1
                                RETURNING *;`;
            const values = [orderId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows;
            };
        
            return [];

        } catch(err) {
            throw new Error(err);
        };
    },

};


module.exports = orderItemsMod;
