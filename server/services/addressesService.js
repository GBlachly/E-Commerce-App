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

            res.status(200).json({ data: addressResult });

        } catch(err) {
            return next(err);
        };
    },

    //GET
    async getByUserId(req, res, next) {
        try {

            const userId = req.user.id;

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
};


module.exports = addressesService