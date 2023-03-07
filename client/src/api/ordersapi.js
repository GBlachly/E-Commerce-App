const root = 'http://localhost:4001/orders/';
const headers = {
    "Content-Type": "application/json",
};


const ordersApi = {

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
        };
    },

    async getByOrderId(id) {
        try {

            const result = await fetch(`${root}id/${id}`, { credentials: 'include' });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async update(data) {
        try {

            const { id, category, update } = data;

            const result = await fetch(`${root}update/${id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    category,
                    update,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async delete(id) {
        try {

            const result = await fetch(`${root}delete/${id}`, {
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


export default ordersApi;
