const bcrypt = require('bcrypt');
const cartsMod = require('../models/cartsModel');
const cartItemsMod = require('../models/cartItemsModel');
const userMod = require('../models/userModel');


const authService = {

    async register(req, res, next) {
        try {

            const { username, password, email, admin, products } = req.body;
            const userAdmin = admin || false;
            
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt); 

            const userData = {
                username: username,
                passwordHash: passwordHash,
                email: email,
                userAdmin: userAdmin
            };

            const createdUser = await userMod.create(userData);
            const user = await userMod.getById(createdUser.id);
            

            const cart = await cartsMod.create(user.id);
            if (products) {
                products.forEach(async (product) => {
                    const cartItemData = {
                        cartId: cart.id,
                        productId: product.productId, 
                        productName: product.productName, 
                        productPrice: product.productPrice, 
                        productUrl: product.productUrl,
                        quantity: product.quantity,
                    };

                    const cartItem = await cartItemsMod.addItem(cartItemData);
                });
            };


            res.status(200).json({ data: user });

        } catch(err) {
            next(err);
        };
    },

    async login(req, res, next) {
        try {

            const user = await userMod.getById(req.user.id);
            res.status(200).json({ data: user });

        } catch(err) {
            next(err);
        };
    },

    async loggedIn(req, res, next) {
        try {

            if (req.user) {
                console.log(` User: ${req.user.id} is logged in`)
                const user = await userMod.getById(req.user.id);
                res.status(200).json({ data: user });
                return;
            };

            res.status(200).json({ message: 'No User Logged In', data: null /* {} ??? */});

        } catch(err) {
            next(err);
        };
    },

    logout(req, res, next) {
        try {

            req.logout(err => {if (err) return next(err)});

            res.status(200).json({ message: 'User Logged Out', data: null /* {} ??? */});

        } catch(err) {
            next(err);
        };
    },

};


module.exports = authService; 