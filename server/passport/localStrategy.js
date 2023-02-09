const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const userMod = require('../models/userModel');


const localStrategy = new LocalStrategy(
  async (username, password, done) => {

    console.log('staring passport strat');

    try {

        const user = await userMod.getByUsername(username);

        if (!user) return done(null, false);
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) return done(null, false);
        return done(null, user);

    } catch(err) {
        return done(err);
    };
  }  
);


module.exports = localStrategy; 
