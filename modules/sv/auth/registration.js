var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    express = require('express'),
    exphbs = require('express-handlebars');

var router = express.Router();

/******************************************************************************
Main Register Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {

    console.log('== Recieved New Registration Request\n');

    response.status(200).render('registration', {
        title: 'Drive Save',
        pagestyle: 'registration'
    });

});

module.exports = router;
