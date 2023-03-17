const db = require('../db/db');


const addressesMod = {
    //CREATE
    async create(data) {
        try {

            const {
                userId, 
                name, 
                line1,
                line2,
                city,
                state, 
                country,
                zipCode
            } = data;

            const statement = `INSERT INTO addresses(user_id, name, line_1, line_2, city, state, country, zip_code)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                                RETURNING *`;
            const values = [userId, name, line1, line2, city, state, country, zipCode];
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

            const statement = `SELECT * FROM addresses
                                WHERE user_id = $1`;
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

            const statement = `SELECT * FROM addresses
                                WHERE id = $1`;
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
    /* async update() {
        try {

            const statement = ``;
            const values = [];
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

            const statement = `DELETE FROM addresses
                                WHERE id = $1
                                RETURING *`;
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


module.exports = addressesMod;