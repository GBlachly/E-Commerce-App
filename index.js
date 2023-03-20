//IMPORTS AND VARIABLES
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./server/passport/localStrategy');
const facebookStrategy = require('./server/passport/facebookStrategy');

const db = require('./server/db/db');
//const userMod = require('./server/models/userModel'); 
//TRY DESERIALIZING USING userMod.getById(id) AT SOME POINT (NEED TO ADD ASYNC/AWAIT???)

const authRouter = require('./server/routes/authRoutes');
const userRouter = require('./server/routes/userRoutes');
const productsRouter = require('./server/routes/productsRoutes');
const ordersRouter = require('./server/routes/ordersRoutes');
const cartRouter = require('./server/routes/cartRoutes');
const addressesRouter = require('./server/routes/addressesRoutes');

require('dotenv').config();
const PORT = process.env.SERVER_PORT;


//MIDDLEWARE
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* SEND STATIC FILES (IMAGES) (???)
const path = require('path') 
app.use('/static', express.static(path.join(__dirname, 'client/build(???)')))

--MAY NEED TO ADD A BUILD FOLDER TO CLIENT (NOT SURE WHAT TO PUT INSIDE IT)
*/


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

    const statement = `SELECT * FROM users WHERE id = $1;`;
    const values = [id];

    db.query(statement, values, (err, result) => {
        if (err) return done(err); 
        done(null, result.rows[0]);
    });
});

passport.use('local', localStrategy);
passport.use('facebook', facebookStrategy);


//ROUTES
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/cart', cartRouter);
app.use('/api/addresses', addressesRouter);


//ERROR HANDLING
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error Occured';
    console.log(message);
    res.status(status).send(message);
});


/* SEND CLIENT/REACT APP (???)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html(???)')); 
});

--MAY NEED TO ADD A BUILD FOLDER TO CLIENT (NOT SURE WHAT TO PUT INSIDE IT)
*/


//LISTEN
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  }
);
