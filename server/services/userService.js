const bcrypt = require('bcrypt');
const userMod = require('../models/userModel');


const userService = {
    //GET (may only need to get user info at login)

    //PUT
    async updateUsername(req, res, next) {
        try {

            const { id } = req.user;
            const { username } = req.body;
            const updatedUser = await userMod.updateUsername({ id, username });

            res.status(200).json({ data: updatedUser });

        } catch(err) {
            next(err);
        };
    },

    async updatePassword(req, res, next) {
        try {

            const { id } = req.user;
            const { password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const updatedUser = await userMod.updatePassword({ id, passwordHash });

            res.status(200).json({ data: updatedUser });

        } catch(err) {
            next(err);
        };
    },

    async updateEmail(req, res, next) {
        try {

            const { id } = req.user;
            const { email } = req.body;
            const updatedUser = await userMod.updateEmail({ id, email });

            res.status(200).json({ data: updatedUser });

        } catch(err) {
            next(err);
        };
    },

    //DELETE
    async delete(req, res, next) {
        try {
    
            const { id } = req.user;
            const deletedUser = await userMod.delete(id);
            
            res.status(200).json({ data: deletedUser });

            //req.logout() ???
        
        } catch(err) {
            next(err);
        };
    },

};


module.exports = userService;
