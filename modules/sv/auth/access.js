var path = require('path'),
    fs = require('fs'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    express = require('express'),
    exphbs = require('express-handlebars');

var router = express.Router();

/******************************************************************************
Main Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {

    console.log('== Recieved New Access Request\n');


    response.status(200).send('');

});


module.exports = router;
