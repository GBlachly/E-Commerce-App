const root = 'http://localhost:4001/api/addresses/';
const headers = {
    "Content-Type": "application/json",
};


const addressesApi = {
    //CREATE
    async create(data) {
        try {

            const {
                name, 
                line1,
                line2,
                city,
                state, 
                country,
                zipCode
            } = data;

            const result = await fetch(`${root}`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ 
                    name, 
                    line1,
                    line2,
                    city,
                    state, 
                    country,
                    zipCode
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        }
    },

    //GET
    async getByUserId(userId = null) {
        try {

            let result;

            if (!userId) {
                result = await fetch(`${root}`, { credentials: 'include' });
            };

            if (userId) {
                result = await fetch(`${root}user/${userId}`, { credentials: 'include' });
            };

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        }
    },

    async getById(id) {
        try {

            const result = await fetch(`${root}id/${id}`, { credentials: 'include' });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        }
    },

};


export default addressesApi;