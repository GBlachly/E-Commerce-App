const db = require('../db/db');


const productsMod = {
    //CREATE
    async create(data) {
        try {

            const { name, price, stock, url, description} = data;
            const statement = `INSERT INTO products (name, price, stock, url, description)
                                VALUES ($1, $2, $3, $4, $5)
                                RETURNING *;`;
            const values = [name, price, stock, url, description];
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
            
            const statement = `SELECT * FROM products
                                ORDER BY id ASC;`;
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

            const { id, category, update } = data;

            let statement = '';

            switch (category) {
                case 'name':
                    statement = `UPDATE products
                                SET name = $2
                                WHERE id = $1
                                RETURNING *;`;
                    break;

                case 'price':
                    statement = `UPDATE products
                                SET price = $2
                                WHERE id = $1
                                RETURNING *;`;
                    break;

                case 'stock':
                    statement=`UPDATE products
                                SET stock = $2
                                WHERE id = $1
                                RETURNING *;`;
                    break;

                case 'url':
                    statement=`UPDATE products
                                SET url = $2
                                WHERE id = $1
                                RETURNING *;`;
                    break;

                case 'description':
                    statement=`UPDATE products
                                SET description = $2
                                WHERE id = $1
                                RETURNING *;`;
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

    async updateStock(data) {
        try {

            const { id, quantity } = data;
            const statement = `UPDATE products
                                SET stock = stock - $2
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, quantity];
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
