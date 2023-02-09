const express = require('express');
const authRouter = express.Router(); 
const passport = require('passport');
const authService = require('../services/authService');


authRouter.get('/logout', authService.logout);

authRouter.post('/register', authService.register);

authRouter.post('/login', passport.authenticate('local'), authService.login);

authRouter.get('/loggedIn', authService.loggedIn);


module.exports = authRouter;
