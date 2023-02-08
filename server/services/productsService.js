const productsMod = require('../models/productsModel')


const productsService = {
    //POST
    async create(req, res, next) {
        try {
    
            const { name, price, stock } = req.body;
            const productStock = stock || 0;

            const data = {
                name: name,
                price: price,
                stock: productStock
            };
    
            const product = await productsMod.create(data);
            res.status(200).json({ data: product });
        
        } catch(err) {
            next(err);
        };
    },

    //GET
    async getAll(req, res, next) {
        try {

            if (req.query.search) {
                const input = req.query.search;
                const products = await productsMod.search(input);
                res.status(200).json({ data: products });
                return;
            };
            
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

    //PUT
    async update(req, res, next) {
        try {

            const id = Number(req.params.id);
            const { name, price, stock } = req.body;
            const productStock = stock || 0;

            const data = {
                id: id,
                name: name,
                price: price,
                stock: productStock
            };

            const product = await productsMod.update(data);
            res.status(200).json({ data: product });

        } catch(err) {
            next(err);
        };
    },

    //DELETE
    async delete(req, res, next) {
        try {

            const id = Number(req.params.id);
            const product = await productsMod.delete(id);
            res.status(200).json({ data: product });
        
        } catch(err) {
            next(err);
        };
    },

};


module.exports = productsService;
