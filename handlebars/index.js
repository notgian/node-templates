const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dotenv = require('dotenv')

/* load values from dotenv file
 * the following are the expected keys
 *
 * APP_PORT:        Port the Application will use
 * MONGO_USER:      Username to use for mongodb authentication
 * MONGO_PASS:      Password to use for mongodb authentication
 * MONGO_CLUSTER:   Name of the cluster to connect to
 * DB_PROD:         Prod database
 * DB_DEV:          Dev database
 *
 */

dotenv.config()

// Connect to MongoDB
const mongoURI = ``;

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
});

// express app proper
const app = express();

/*
 *  Configuring app settings
 */

app.engine('hbs', hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');

app.use(express.static('./public'));

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null,
        httpOnly: true,
    }
}));

/* 
 * Application routes
 *
 */

const { homeRouter } = require('./routes/home.js')
const { authRouter } = require('./routes/auth.js')

app.use('/', homeRouter);
app.use('/auth', authRouter);

// 404 page. Currently returns a json object
app.use( ( req, res, next ) => {
    res.sendStatus(404);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
