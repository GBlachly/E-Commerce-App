const root = 'http://localhost:4001/products/';
const headers = {
    "Content-Type": "application/json",
};


const productsApi = {

    async create(data) {
        try {

            const { name, price, stock } = data;

            const result = await fetch(`${root}`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    price,
                    stock,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async getAll(input = '') {
        try {

            if (!input) {
                const result = await fetch(`${root}`, { credentials: 'include' });

                const json = await result.json();
                return json.data;
            };
            
            if (input) {
                const result = await fetch(`${root}?search=${input}`, { credentials: 'include' });

                const json = await result.json();
                return json.data;
            };

        } catch(err) {
            throw new Error(err);
        };
    },

    async getById(id) {
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

            const { id, name, price, stock } = data;

            const result = await fetch(`${root}id/${id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    price,
                    stock,
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

            const result = await fetch(`${root}id/${id}`, {
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


export default productsApi;
