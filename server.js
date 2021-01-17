const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var async = require('async');
var fs = require('fs');
var pg = require('pg');
const config = require('./config.json')

// Connect to database.
const dbConfig = {
    user: (config) ? config.user : process.env.user,
    password: (config) ? config.password : process.env.password,
    host: (config) ? config.host : process.env.host,
    port: (config) ? config.port : process.env.port,
    database: (config) ? config.database : process.env.database,
    ssl: {
        ca: fs.readFileSync(__dirname + '/trusty-lemur-ca.crt').toString(),
    }
};

// Create a pool.
var pool = new pg.Pool(dbConfig);


const app = express();
// require('./services/passport')(passport);

app.use(
	session({
        name:'sid',
		secret: 'Insert randomized text here',
		resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: true,
            secure: true //process.env.NODE_ENV === 'production'
        }
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.
// app.enable('trust proxy');
// app.use(function (req, res, next) {
// 	if (req.secure || req.headers.host === 'localhost:5000') {
// 		next();
// 	} else {
// 		// request was via http, so redirect to https
// 		console.log('redirecting');
// 		console.log(req.headers.host);
// 		res.redirect(301, 'https://' + req.headers.host + req.url);
// 	}
// });

app.use(express.static(__dirname + '/client/build'));

app.use(passport.initialize());
// console.log('initialized');
app.use(passport.session());

require('./services/passport')(passport, pool);
require ('./routes/authenticateUsers')(app, passport, pool);
require ('./routes/queryStudent')(app, pool);
require ('./routes/queryCourses')(app, pool);
require ('./routes/queryTasks')(app, pool);

// All routes other than above will go to index.html
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

/* Tell server to listen to port in environemnt variable, else, listen to port 5000 */
app.listen(process.env.PORT||5000, () => {
	console.log('starting listening at port 5000');
});

// app.set('view engine', 'html');
