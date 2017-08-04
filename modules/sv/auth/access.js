var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    passport = require('passport');


const saltRounds = 5;
require(__dirname + '/passport.js')(passport);

var router = express.Router();

/******************************************************************************
Main Access Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {

    console.log('== Recieved New Access Request\n');

    if(request.user) {
        console.log('== Already Logged In');
        response.status(200).redirect('../'); return;
    }

    response.status(200).render('access', {
        title: 'Drive Safe',
        pagestyle: 'logon',
        secure: false,
        logon: true
    });

});

/******************************************************************************
Local Login Mechanisim
******************************************************************************/
router.post('/login',  function(request, response, next) {

    passport.authenticate('local', function(error, user) {
        // If there is an error move to the error
        if(error) { return next(error); }

        // If the User was not authenticated send error to the login client
        if(!user) {
            return response.status(403).send({
                status: 'FAILED',
                msg: 'NA'
            });
        }

        request.login(user, function(error) {
            // If there is an error move to the error page
            if(error) { return next(error); }
            // If login is successful redirect to the home page
            return response.status(200).send({
                status: 'SUCCESS',
                home: '/',
                msg: 'User Validated'
            });
        });

    })(request, response, next);

});

router.get('/logout', function(request, response){
    request.logout();
    response.redirect('../access');
});


module.exports = router;
