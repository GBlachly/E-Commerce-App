const root = 'http://localhost:4001/api/auth/';
const headers = {
    "Content-Type": "application/json",
};


const authApi = {

    async register(data) {
        try {

            const { username, password, email, admin, cartProducts } = data;
            const userAdmin = admin || false;
            
            let products = null;
            if (cartProducts.length) {
                products = cartProducts;
            };
            
            const result = await fetch(`${root}register`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    admin: userAdmin,
                    products: products,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async login(data) {
        try {

            const { username, password } = data;

            const result = await fetch(`${root}login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    username, 
                    password,
                }),
                headers: headers,
            });

            const json = await result.json();
            return json.data;

        } catch(err) {
            throw new Error(err);
        };
    },

    async loggedIn() {
        try {

            const result = await fetch(`${root}loggedIn`, { credentials: 'include' });

            const json = await result.json();
            return json.data;   // will return user object if logged in, return null if no user logged in

        } catch(err) {
            throw new Error(err);
        };
    },

    async logout() {
        try {

            const result = await fetch(`${root}logout`, { credentials: 'include' });

            const json = await result.json();
            return json.data;   //currently will return null if logout is successful

        } catch(err) {
            throw new Error(err);
        };
    },

};


export default authApi;
