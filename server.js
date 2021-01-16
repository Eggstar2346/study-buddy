const express = require('express');
// const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passport = require('passport');
var async = require('async');
var fs = require('fs');
var pg = require('pg');

// Connect to the "bank" database.
var config = {
    user: 'yagongvo',
    password: 'password1234',
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    port: 26257,
    database: 'merry-vole-225.bank',
    ssl: {
        ca: fs.readFileSync('C:\\Users\\histo\\Documents\\cc-ca.crt').toString(),
    }
};

// Create a pool.
var pool = new pg.Pool(config);

const app = express();
// require('./services/passport')(passport);

// app.use(
// 	session({
// 		secret: 'Insert randomized text here',
// 		resave: false,
// 		saveUninitialized: false
// 	})
// );

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

// app.use(passport.initialize());
// console.log('initialized');
// app.use(passport.session());

pool.connect(function (err, client, done) {
    // Close communication with the database and exit.
    var finish = function () {
        done();
        process.exit();
    };

    if (err) {
        console.error('could not connect to cockroachdb', err);
        finish();
    }
});

require ('./routes/registerUser')(app);
require ('./routes/updateUser')(app);

// All routes other than above will go to index.html
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

/* Tell server to listen to port in environemnt variable, else, listen to port 5000 */
app.listen(process.env.PORT || 5000, () => {
	console.log('starting listening at port 5000');
});