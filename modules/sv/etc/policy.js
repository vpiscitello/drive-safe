/******************************************************************************
Login Requests
******************************************************************************/
var path = require('path'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser');

var router = express.Router();

/******************************************************************************
Policy Get Request
******************************************************************************/
router.get('/', function(request, response) {
    console.log("== Got access request", "\n");
    //Render the login screen and display
    response.status(200).render(__dirname + '/../../../views/policy', {
        title: 'Drive Safe Policies',
        pagestyle: 'policy',
        greeting: 'Drive Safe Policies',
        message: 'Here you will find a list of all our current policy documents.'
    });
});

/******************************************************************************
Terms of Service Get Request
******************************************************************************/
router.get('/terms-of-service', function(request, response) {
    console.log("== Got access request", "\n");
    //Render the login screen and display
    response.status(200).render(__dirname + '/../../../views/tos', {
        title: 'Drive Safe: Terms of Service',
        pagestyle: 'policy',
        greeting: 'Terms of Service',
        message: 'Below you will be able to read through our terms of service.'
    });
});

/******************************************************************************
Privacy Policy Get Request
******************************************************************************/
router.get('/privacy', function(request, response) {
    console.log("== Got access request", "\n");
    //Render the login screen and display
    response.status(200).render(__dirname + '/../../../views/privacy', {
        title: 'Drive Safe: Privacy Policy',
        pagestyle: 'policy',
        greeting: 'Privacy Policy',
        message: 'Below you will be able to read through our privacy policy.'
    });
});


module.exports = router;
