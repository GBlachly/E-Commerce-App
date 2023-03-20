--Table Definitions

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    email VARCHAR(50) UNIQUE,
    admin BOOL DEFAULT FALSE,
    facebook_id VARCHAR
);
--not sure what data type to use for facebook/ how to set up FB data


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    price MONEY NOT NULL,
    stock INTEGER NOT NULL,
    url TEXT,
    description TEXT
); 


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_price MONEY,
    ship_status TEXT DEFAULT 'Not Yet Shipped',
    address_id INT REFERENCES addresses(id)
); 
--add time and date order placed 


CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) UNIQUE
);


CREATE TABLE orders_products (
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    product_name TEXT,
    product_price MONEY,
    product_url TEXT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
--add items-price(price*quantity)


CREATE TABLE carts_products (
    cart_id INT REFERENCES carts(id),
    product_id INT REFERENCES products(id),
    product_name TEXT,
    product_price MONEY,
    product_url TEXT, 
    quantity INTEGER NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);
--add items-price(price*quantity)


CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name TEXT,
    line_1 TEXT NOT NULL,
    line_2 TEXT,
    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL,
    zip_code INT NOT NULL
); 



--Example Inserts

INSERT INTO users (username, password, email, admin)
VALUES ();

INSERT INTO products(name, price, stock, url)
VALUES ();

INSERT INTO orders(user_id, total_price)
VALUES ();

INSERT INTO carts(user_id)
VALUES ();

INSERT INTO orders_products(order_id, product_id, product_name, product_price, product_url, quantity)
VALUES ();

INSERT INTO carts_products(cart_id, product_id, product_name, product_price, product_url, quantity)
VALUES ();

INSERT INTO addresses(user_id, name, line_1, line_2, city, state, country, zip_code)
VALUES ();



--OTHER TABLES

/* 
CREATE TABLE payment_info (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    name TEXT NOT NULL,
    card_number INT NOT NULL,
    expiration_date (?)DATE(?) NOT NULL,
    security_code INT NOT NULL,
    zip_code INT NOT NULL,
    address_id INT REFERENCES addresses(id) NOT NULL
);
*/
