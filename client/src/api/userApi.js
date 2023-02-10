const root = 'http://localhost:4001/user/';
const headers = {
    "Content-Type": "application/json",
};


const userApi = {

    async updateUsername(username) {
        try{

            const result = await fetch(`${root}username`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    username,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async updatePassword(password) {
        try {

            const result = await fetch(`${root}password`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    password
                }),
                headers: headers,
            });
    
            const json = await result.json();
            return json.data; 

        } catch(err) {
            throw new Error(err);
        };
    },

    async updateEmail(email) {
        try {

            const result = await fetch(`${root}email`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    email,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;
        
        } catch(err) {
            throw new Error(err);
        };
    },

    async delete() {
        try {
            
            const result = await fetch(`${root}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const json = await result.json();
            return json.data;
        
        } catch(err) {
            throw new Error(err);
        };
    },

};


export default userApi;
