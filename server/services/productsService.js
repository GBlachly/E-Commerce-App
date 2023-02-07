const productsMod = require('../models/productsModel')


const productService = {
    
    async getAll(req, res, next) {
        try {
            
            const products = await productsMod.getAll();
            res.status(200).json({ data: products });
        
        } catch(err) {
            next(err);
        };
    },

    async getById(req, res, next) {
        try {

            const id = Number(req.params.id);
            const product = await productsMod.getById(id);
            res.status(200).json({ data: product });
        
        } catch(err) {
            next(err);
        };
    },

};


module.exports = productService;
