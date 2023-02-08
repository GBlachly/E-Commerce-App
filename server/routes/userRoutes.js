const express = require('express');
const userRouter = express.Router(); 
const userService = require('../services/userService');


userRouter.put('/username', userService.updateUsername);

userRouter.put('/password', userService.updatePassword);

userRouter.put('/email', userService.updateEmail);

userRouter.delete('/delete', userService.delete);


module.exports = userRouter;
