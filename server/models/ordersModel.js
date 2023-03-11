const db = require('../db/db');


const ordersMod = {
    //CREATE
    async create(data) {
        try {

            const { userId, totalPrice, addressId } = data;
            const statement = `INSERT INTO orders (user_id, total_price, address_id)
                                VALUES ($1, $2, $3)
                                RETURNING *;`;
            const values = [userId, totalPrice, addressId];
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
    async getByUserId(userId) {
        try {

            const statement = `SELECT * FROM orders 
                                WHERE user_id = $1
                                ORDER BY id DESC;`;
            const values = [userId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows;
            };
        
            return [];

        } catch(err) {
            throw new Error(err);
        };
    },

    async getById(id) {
        try {

            const statement = `SELECT * FROM orders 
                                WHERE id = $1;`;
            const values = [id];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //UPDATE
    async update(data) {
        try {

            const { id, category, update } = data;

            let statement = '';

            switch (category) {
                case 'totalPrice':
                    statement = `UPDATE orders
                                SET total_price = $2
                                WHERE id = $1
                                RETURNING *`;
                    break;

                case 'shipStatus':
                    statement = `UPDATE orders
                                SET ship_status = $2
                                WHERE id = $1
                                RETURNING *`;
                    break;

                default:
                    statement = '';
                    break;
            };

            const values = [id, update];
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
    async delete(id) {
        try {

            const statement = `DELETE FROM orders
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

};


module.exports = ordersMod;
