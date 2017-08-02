var path = require('path'),
    express = require('express'),
    session = require('express-session'),
    exphbs = require('express-handlebars'),
    compression = require('compression'),
    assert = require('assert'),
    bodyParser = require('body-parser'),
    checkAuth = require(__dirname + '/modules/sv/auth/checkAuth.js'),
    helpers = require(__dirname + '/modules/sv/helpers/handlebar-helpers.js')();

require('dotenv').config({
    path: 'config.env'
});

/******************************************************************************
Resource Setup
******************************************************************************/
var app = express(),
    port = process.env.PORT || 3000;

app.set('trust proxy');

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    proxy: true,
    cookie: {
        secure: true,
        expires: 24 * 60 * 60 * 1000,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.listen(port, function() {
    console.log("== Listening on port", port, "\n");
});


/******************************************************************************
Base Server Setup
******************************************************************************/


/******************************************************************************
Home Page Request
******************************************************************************/
app.get('/', function(request, response, next) {
    console.log('== Got request for:', request.url, '\n');
    response.render('index', {
        title: 'Drive Safe',
        pagestyle: 'index',
        secure: true
    });

});

app.use('/access', require(__dirname + '/modules/sv/auth/access.js'));
app.use('/registration', require(__dirname + '/modules/sv/auth/registration.js'));
app.use('/policy', require(__dirname + '/modules/sv/etc/policy.js'));

// Uncomment for unsecure routes
app.use('/rewards', require(__dirname + '/modules/sv/account/rewards.js'));
app.use('/profile', require(__dirname + '/modules/sv/account/profile.js'));

// Uncomment for secure routes
// app.use('/rewards', checkAuth, require(__dirname + '/modules/sv/account/rewards.js'));
// app.use('/profile', checkAuth, require(__dirname + '/modules/sv/account/profile.js'));

/******************************************************************************
404 Error Handling
******************************************************************************/
app.get('*', function(request, response, next) {
    response.status(404).render('not-found', {
        title: 'Page Not Found',
        pagestyle: 'server-error',
        secure: false
    });
    console.log('== File Not Found | Status Code', response.statusCode);
    console.log('== Request', request.path, '\n');
});


/******************************************************************************
500 Error Handling
******************************************************************************/
app.use(function(error, request, response, next) {
    response.status(500).render('server-error', {
        title: 'Drive Safe Internal Server Error',
        pagestyle: 'server-error',
        secure: false
    });
    console.log('== Internal Server Error | Status Code', response.statusCode);
    console.log('== Request', request.path, '\n');
    console.log(error);
});
