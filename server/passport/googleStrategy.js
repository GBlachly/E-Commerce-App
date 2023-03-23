require('dotenv').config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userMod = require('../models/userModel');
const cartsMod = require('../models/cartsModel');


const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4001/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, cb) => {
        
    console.log('Starting Google Strat');

    try {

        const user = await userMod.getByGoogleId(profile.id);

        if (!user) {
            const newUser = await userMod.createWithGoogle({
                googleId: profile.id,
                //email: (??? NOT SURE HOW TO GET EMAIL),
                //MAY JUST WANT TO HAVE USER ADD EMAIL AFTERWARDS
            });

            if (!newUser) return cb(null, false);
            
            const newUserCart = await cartsMod.create(newUser.id);
            return cb(null, newUser)
        };

        return cb(null, user);

    } catch(err) {
        return cb(err);
    };
});


module.exports = googleStrategy;