const db = require('../db/db');


const userMod = {
    //CREATE
    async create(data) {
        try {

            const { username, passwordHash, email, userAdmin } = data;

            const existingUsername = await this.getByUsername(username);
            const existingEmail = await this.getByEmail(email);
            
            if ( existingUsername ) { 
                throw new Error('Username already exists');
            };

            if ( existingEmail ) { 
                throw new Error('Email already exists');
            };

            const statement = `INSERT INTO users (username, password, email, admin)
                                VALUES ($1, $2, $3, $4) 
                                RETURNING *;`;
            const values = [username, passwordHash, email, userAdmin];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //READ
    async getById(id) {
        try {

            const statement = `SELECT * FROM users 
                                WHERE id = $1;`;
            const values = [id];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            };

            return null;

        } catch(err) {
            throw new Error(err);
        };
    },
    
    async getByUsername(username) {
        try {

            const statement = `SELECT * FROM users 
                                WHERE username = $1;`;
            const values = [username];
            const result = await db.queryNoCB(statement, values);
            
            if (result.rows?.length) {
                return result.rows[0];
            };
            
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async getByEmail(email) {
        try {

            const statement = `SELECT * FROM users 
                                WHERE email = $1;`;
            const values = [email];
            const result = await db.queryNoCB(statement, values);
            
            if (result.rows?.length) {
                return result.rows[0];
            };
            
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //UPDATE 
    async updateUsername(data) {
        try {

            const { id, username } = data;
            const statement = `UPDATE users
                                SET username = $2
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, username];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            };

            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async updatePassword(data) {
        try {

            const { id, passwordHash } = data;
            const statement = `UPDATE users
                                SET password = $2
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, passwordHash];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            };

            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async updateEmail(data) {
        try {

            const { id, email } = data;
            const statement = `UPDATE users
                                SET email = $2
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id, email];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            };

            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //DELETE
    async delete(id) {
        try {

            const statement = `DELETE FROM users
                                WHERE id = $1
                                RETURNING *;`;
            const values = [id];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    //FACEBOOK CREATE/READ
    async getByFacebookId(facebookId) {
        try {

            const statement = `SELECT * FROM users 
                                WHERE facebook_id = $1;`;
            const values = [facebookId];
            const result = await db.queryNoCB(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            };

            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

    async createWithFacebook(data) {
        try {

            const { facebookId } = data;

            const statement = `INSERT INTO users (facebook_id)
                                VALUES ($1) 
                                RETURNING *;`;
            const values = [facebookId];
            const result = await db.queryNoCB(statement, values);
        
            if (result.rows?.length) {
                return result.rows[0];
            };
        
            return null;

        } catch(err) {
            throw new Error(err);
        };
    },

        //GOOGLE CREATE/READ
        async getByGoogleId(googleId) {
            try {
    
                const statement = `SELECT * FROM users 
                                    WHERE google_id = $1;`;
                const values = [googleId];
                const result = await db.queryNoCB(statement, values);
    
                if (result.rows?.length) {
                    return result.rows[0];
                };
    
                return null;
    
            } catch(err) {
                throw new Error(err);
            };
        },
    
        async createWithGoogle(data) {
            try {
    
                const { googleId } = data;

                const statement = `INSERT INTO users (google_id)
                                    VALUES ($1) 
                                    RETURNING *;`;
                const values = [googleId];
                const result = await db.queryNoCB(statement, values);
            
                if (result.rows?.length) {
                    return result.rows[0];
                };
            
                return null;
    
            } catch(err) {
                throw new Error(err);
            };
        },
};


module.exports = userMod;
