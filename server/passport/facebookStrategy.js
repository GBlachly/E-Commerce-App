require('dotenv').config();
const FacebookStrategy = require("passport-facebook").Strategy;
const userMod = require('../models/userModel');
const cartsMod = require('../models/cartsModel');


const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:4001/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}, async (accessToken, refreshToken, profile, cb) => {
    
    console.log('Starting Facebook Strat');

    try {

        const user = await userMod.getByFacebookId(profile.id);

        if (!user) {
            const newUser = await userMod.createWithFacebook({
                facebookId: profile.id,
                //username: profile.displayName, (DONT KNOW IF I WANT TO AUTO SET USERNAME TO DISPLAYNAME)
                //email: profile.email || null,  (NEED FACEBOOK TO VERIFY APP)
                //MAY JUST WANT TO HAVE USER ADD USERNAME/EMAIL AFTERWARDS
            });

            if (!newUser) return cb(null, false);
            
            const newUserCart = await cartsMod.create(newUser.id);
            return cb(null, newUser)
        };

        return cb(null, user);

    } catch(err) {
        return cb(err);
    };
})

module.exports = facebookStrategy;