const addressesMod = require('../models/addressesModel');


const addressesService = {
    //POST
    async create(req, res, next) {
        try {

            const userId = req.user.id;

            let { name, line1, line2, city, state, country, zipCode } = req.body;

            if (!name) {
                name = null;
            };

            if (!line2) {
                line2 = null;
            };

            if (!state) {
                state = null;
            };

            const addressResult = await addressesMod.create({
                userId,
                name,
                line1,
                line2,
                city,
                state,
                country,
                zipCode
            });

            const address = {
                id: addressResult.id,
                userId: addressResult.user_id,
                name: addressResult.name,
                line1: addressResult.line_1,
                line2: addressResult.line_2,
                city: addressResult.city,
                state: addressResult.state,
                country: addressResult.country,
                zipCode: addressResult.zip_code, 
            };

            res.status(200).json({ data: address });

        } catch(err) {
            return next(err);
        };
    },

    //GET
    async getByUserId(req, res, next) {
        try {

            let userId;

            if (req.params.id) {
                userId = Number(req.params.id);
            } else {
                userId = req.user.id;
            };

            const addressesResult = await addressesMod.getByUserId(userId);

            const userAddresses = [];
            addressesResult.forEach((address) => {

                const addressData = {
                    id: address.id,
                    userId: address.user_id,
                    name: address.name,
                    line1: address.line_1,
                    line2: address.line_2,
                    city: address.city,
                    state: address.state,
                    country: address.country,
                    zipCode: address.zip_code, 
                };

                userAddresses.push(addressData);
            });

            res.status(200).json({ data: userAddresses });

        } catch(err) {
            return next(err);
        };
    },

    async getById(req, res, next) {
        try {

            const id = Number(req.params.id);

            const addressResult = await addressesMod.getById(id);

            const address = {
                id: addressResult.id,
                userId: addressResult.user_id,
                name: addressResult.name,
                line1: addressResult.line_1,
                line2: addressResult.line_2,
                city: addressResult.city,
                state: addressResult.state,
                country: addressResult.country,
                zipCode: addressResult.zip_code, 
            };

            res.status(200).json({ data: address });

        } catch(err) {
            return next(err);
        };

    }
};


module.exports = addressesService