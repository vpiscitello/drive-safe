var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars');

var router = express.Router();

/******************************************************************************
Main Profile Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {
    console.log('== Recieved New Profile Request\n');


    response.status(200).render('profile', {
        title: 'Drive Safe',
        pagestyle: 'profile',
        secure: true
    });

});


module.exports = router;
