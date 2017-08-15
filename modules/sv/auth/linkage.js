var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    shortid = require('shortid');


const saltRounds = 5;

var router = express.Router();


/******************************************************************************
Generate Link Request Handler
******************************************************************************/
router.post('/generate', function(request, response, next) {

    console.log('== Generate New Link Request\n');

    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

    var user = request.user.authentication.local.email;
    var linkCode = shortid.generate();

    bcrypt.genSalt(saltRounds, function(error, salt) {
        bcrypt.hash(linkCode, salt, function(error, hash) {

            request.database.collection('users').findOneAndUpdate(
            { 'authentication.local.email': user },
            { $set: { 'security.linked_accounts.code': hash } },
            function(error, child) {
                if(child) {
                    response.status(200).send({
                        status: 'SUCCESS',
                        code: linkCode
                    });
                } else {
                    response.status(403).send({
                        status: 'FAILED',
                        msg: 'There was an error with generating your code! Please try again!'
                    });
                }
            });

        });

    });


});

/******************************************************************************
Generate Link Request Handler
******************************************************************************/
router.post('/confirm', function(request, response, next) {

    console.log('== Confirm Link Access Request\n');

    var user = request.body.email.trim(),
        code = request.body.code.trim();

    request.database.collection('users').findOne({
        'authentication.local.email': user
    }, function(error, linkUser) {
        if (linkUser) {
            var requestedCode = linkUser.security.linked_accounts.code;

            bcrypt.compare(code, requestedCode, function(error, success) {
                if (success) {
                    console.log('== Account is Linked');
                    response.status(200).send({
                        status: 'SUCCESS',
                        msg: 'The accounts was successfully linked!'
                    });
                } else {
                    console.log('== Couldn\'t Link Account');
                    response.status(403).send({
                        status: 'FAILED',
                        msg: 'The accounts could not be linked!'
                    });
                }
            });

        } else {
            response.status(403).send({
                status: 'FAILED',
                msg: 'The account you are attempting to link does not exist!'
            });
        }

    });


});


module.exports = router;
