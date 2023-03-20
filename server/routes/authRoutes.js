const express = require('express');
const authRouter = express.Router(); 
const passport = require('passport');
const authService = require('../services/authService');


authRouter.get('/logout', authService.logout);

//only registers user, does not log them in ( user info not given to passport )
authRouter.post('/register', authService.register);

authRouter.post('/login', passport.authenticate('local'), authService.login);

authRouter.get('/loggedIn', authService.loggedIn);

//FACEBOOK OAUTH ROUTES
authRouter.get('/facebook', passport.authenticate('facebook'));

authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/login',
    failureRedirect: 'http://localhost:3000/login'
}));


module.exports = authRouter;
