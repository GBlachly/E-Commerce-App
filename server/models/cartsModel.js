const db = require('../db/db');


const cartsMod = {
    //CREATE
    async create(data) {
        try {

            const { userId, totalPrice } = data;
            const statement = `INSERT INTO carts (user_id, total_price)
                                VALUES ($1, $2)
                                RETURNING *;`;
            const values = [userId, totalPrice];
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

            const statement = `SELECT * FROM carts 
                                WHERE user_id = $1;`;
            const values = [userId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async getById(id) {
        try {

            const statement = `SELECT * FROM carts 
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

            const { id, totalPrice } = data;
            const statement = `ALTER TABLE carts
                                SET total_price = $2
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, totalPrice];
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

            const statement = `DELETE FROM carts
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


module.exports = cartsMod;
