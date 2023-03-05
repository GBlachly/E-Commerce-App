const db = require('../db/db');


const cartItemsMod = {
    //CREATE
    async addItem(data) {
        try {

            const { cartId, productId, productName, productPrice, productUrl, quantity } = data;
            const statement = `INSERT INTO carts_products (cart_id, product_id, product_name, product_price, product_url, quantity)
                                VALUES ($1, $2, $3, $4, $5, $6)
                                RETURNING *;`;
            const values = [cartId, productId, productName, productPrice, productUrl, quantity];
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
    async getItemsByCartId(cartId) {
        try {

            const statement = `SELECT * FROM carts_products 
                                WHERE cart_id = $1;`;
            const values = [cartId];
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
    //(will update cart items if admin updates the information of a product)
    async update(data) {
        try {

            const { id, category, update } = data;

            statement = '';

            switch (category) {
                case 'name':
                    statement = `UPDATE carts_products
                                SET product_name = $2
                                WHERE product_id = $1
                                RETURNING *;`;
                    break;

                case 'price':
                    statement = `UPDATE carts_products
                                SET product_price = $2
                                WHERE product_id = $1
                                RETURNING *;`;
                    break;

                case 'url':
                    statement = `UPDATE carts_products
                                SET product_url = $2
                                WHERE product_id = $1
                                RETURNING *;`;
                    break;

                default:
                    statement = ``;
                    break;
            };

            const values = [id, update];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows;
            };

            return [];

        } catch(err) {
            throw new Error(err);
        };
    },

    async updateQuantity(data) {
        try {

            const { cartId, productId, quantity } = data;
            const statement = `UPDATE carts_products
                                SET quantity = $3
                                WHERE cart_id = $1 AND product_id = $2
                                RETURNING *;`;
            const values = [cartId, productId, quantity];
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

            const { cartId, productId } = data;
            const statement = `DELETE FROM carts_products
                                WHERE cart_id = $1 AND product_id = $2
                                RETURNING *;`;
            const values = [cartId, productId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async deleteAll(cartId) {
        try {

            const statement = `DELETE FROM carts_products
                                WHERE cart_id = $1
                                RETURNING *;`;
            const values = [cartId];
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


module.exports = cartItemsMod;
