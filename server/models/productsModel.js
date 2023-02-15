const db = require('../db/db');


const productsMod = {
    //CREATE
    async create(data) {
        try {

            const { name, price, stock } = data;
            const statement = `INSERT INTO products (name, price, stock)
                                VALUES ($1, $2, $3)
                                RETURNING *;`;
            const values = [name, price, stock];
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
    async getAll() {
        try {
            
            const statement = `SELECT * FROM products;`;
            const values = [];
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

            const statement = `SELECT * FROM products 
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

    async search(input) {
        try {

            const statement = `SELECT * FROM products 
                                WHERE name LIKE %$1%;`;     //this query statement has a syntax error currently
            const values = [input];
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

            const { id, name, price, stock } = data
            const statement = `UPDATE products
                                SET name = $2, price = $3, stock = $4 
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, name, price, stock];
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

            const statement = `DELETE FROM products
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


module.exports = productsMod;
