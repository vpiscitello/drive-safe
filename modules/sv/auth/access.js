var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    express = require('express'),
    exphbs = require('express-handlebars');

var router = express.Router();

/******************************************************************************
Main Access Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {

    console.log('== Recieved New Access Request\n');

    response.status(200).render('access', {
        title: 'Drive Safe',
        pagestyle: 'logon',
        secure: false,
        logon: true
    });

});

module.exports = router;
