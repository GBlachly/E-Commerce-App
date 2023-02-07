const db = require('../db/db');


const prodMod = {

    async selectAll() {
        const statement = `SELECT * FROM products;`;
        const values = [];
        const result = await db.queryNoCB(statement, values);
        
        if (result.rows?.length) {
            return result.rows;
        };
        
        return [];
    },

    async selectById(id) {
        const statement = `SELECT * FROM products WHERE id = $1;`;
        const values = [id];
        const result = await db.queryNoCB(statement, values);
        
        if (result.rows?.length) {
            return result.rows[0];
        };
        
        return null;
    },

};


module.exports = prodMod;
