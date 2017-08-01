var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars');

var router = express.Router();

/******************************************************************************
Main Profile Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {
    console.log('== Recieved New Rewards Request\n');


    response.status(200).send('');

});


module.exports = router;
