var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt');

var router = express.Router();

/******************************************************************************
Main Test Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {

    console.log('== Recieved New Test Request\n');

    response.status(200).render('test', {
        title: 'Drive Safe',
        pagestyle: 'test',
        secure: true
    });

});

module.exports = router;
