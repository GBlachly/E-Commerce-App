const express = require('express');
const authRouter = express.Router(); 
const passport = require('passport');


authRouter.get('/logout', );

authRouter.post('/register', );

authRouter.post('/login', passport.authenticate('local'), );

authRouter.get('/loggedIn', );


module.exports = authRouter;