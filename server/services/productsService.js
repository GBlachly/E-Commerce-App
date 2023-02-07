const prodMod = require('../models/productsModel')


const productService = {
    
    async getAll(req, res, next) {
        try {
            const products = await prodMod.selectAll();
            res.status(200).json({ products: products });
        } catch(err) {
            next(err);
        };
    },

    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const product = await prodMod.selectById(id);
            res.status(200).json({ product: product });
        } catch(err) {
            next(err);
        };
    },

};


module.exports = productService;