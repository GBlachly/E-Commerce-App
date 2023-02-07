const db = require('../db/db');


const userMod = {
    //CREATE
    async create(data) {
        try {

            const { username, password, email, admin } = data;
            const statement = `INSERT INTO users (username, email, password, admin)
                                VALUES ($1, $2, $3, $4) 
                                RETURNING *;`;
            const values = [username, password, email, admin];
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
    async getById(id) {
        try {

            const statement = `SELECT * FROM users 
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
    
    async getByUsername(username) {
        try {

            const statement = `SELECT * FROM users 
                                WHERE username = $1;`;
            const values = [username];
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

            const { id, username, password, email, admin } = data;
            const statement = `ALTER TABLE users
                                SET username = $2, password = $3, email = $4, admin = $5
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, username, password, email, admin];
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

            const statement = `DELETE FROM users
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


module.exports = userMod;
