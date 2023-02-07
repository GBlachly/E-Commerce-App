//IMPORTS AND VARIABLES
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./server/passport/localStrategy');

const authRouter = require('./server/routes/authRoutes');
const userRouter = require('./server/routes/userRoutes');
const productsRouter = require('./server/routes/productsRoutes');
const ordersRouter = require('./server/routes/ordersRoutes');
const cartRouter = require('./server/routes/cartRoutes');

require('dotenv').config();
const PORT = process.env.SERVER_PORT;


//MIDDLEWARE
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


//SESSIONS
app.use(session({
        name: 'Ecommerce App Session',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 100
        }
    })
);


//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log(`Start Serialize id: ${user.id}`);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`Start Deserialize id: ${id}`);
    //const user = user.findById(id);
    done(null, user);
});

passport.use('local', localStrategy);


//ROUTES
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);


//ERROR HANDLING
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error Occured';
    console.log(message);
    res.status(status).send(message);
});


//LISTEN
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  }
);