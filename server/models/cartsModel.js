const db = require('../db/db');


const cartsMod = {
    //CREATE
    async create(userId) {
        try {

            const statement = `INSERT INTO carts (user_id)
                                VALUES ($1)
                                RETURNING *;`;
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
    /* async update(data) {
        try {

            const { userId, totalPrice } = data;
            const statement = `UPDATE carts
                                SET total_price = $2
                                WHERE user_id = $1
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
    }, */

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
