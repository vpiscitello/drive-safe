var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars');

var router = express.Router();

/******************************************************************************
Main Rewards Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {
    console.log('== Recieved New Rewards Request\n');


    response.status(200).render('rewards', {
        title: 'Drive Save',
        pagestyle: 'rewards'
    });

});


module.exports = router;
