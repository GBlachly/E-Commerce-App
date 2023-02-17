const root = 'http://localhost:4001/cart/';
const headers = {
    "Content-Type": "application/json",
};


const cartApi = {

    async create(products = []) {
        try {

            const result = await fetch(`${root}`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ 
                    products,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;


        } catch(err) {
            throw new Error(err);
        };
    },

    async getByUserId() {
        try {

            const result = await fetch(`${root}`, { credentials: 'include' });

            const json = await result.json();
            return json.data;

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

    async addItem(product) {        //product = {id: interger, name: string, price: money, quantitiy: integer}
        try {

            const result = await fetch(`${root}addItem`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({
                    product,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async deleteItem(productId) {
        try {

            const result = await fetch(`${root}deleteItem`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    productId,
                }),
                headers: headers
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async updateQuantity(productId, quantity) {
        try {

            const result = await fetch(`${root}updateQuantity`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    productId,
                    quantity
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async clearCart() {
        try{

            const result = await fetch(`${root}clearCart`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async checkout(totalPrice) {
        try {

            const result = await fetch(`${root}checkout`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    totalPrice,
                }),
                headers: headers,
            });

            const json = result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },
    
};


export default cartApi;