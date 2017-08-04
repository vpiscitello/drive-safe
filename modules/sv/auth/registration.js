var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    models = require(__dirname + '/../../db/models.js')(),
    crypto = require('crypto'),
    bcrypt = require('bcrypt');

const saltRounds = 5;

var router = express.Router();

/******************************************************************************
Main Register Request Handler
******************************************************************************/
router.get('/', function(request, response, next) {

    console.log('== Recieved New Registration Page Request\n');

    response.status(200).render('registration', {
        title: 'Drive Safe',
        pagestyle: 'registration',
        secure: false
    });

});

/******************************************************************************
Post Register Request Handler
******************************************************************************/
router.post('/register', function(request, response, next) {
    console.log('== Recieved New Registration Request\n');

    var userFields = {
        email: request.body.email.trim(),
        password: request.body.password.trim(),
        firstname: request.body.firstname.trim(),
        lastname: request.body.lastname.trim(),
        birthday: request.body.birthday.trim(),
        phone: request.body.phone.trim(),
        location: request.body.location.trim(),
        make: request.body.make.trim(),
        model: request.body.model.trim(),
        insurance: request.body.insurance.trim()
    };

    storeUserData(request, userFields, function(success) {

        if (success) {
            response.status(200).send({
                status: 'SUCCESS',
                msg: 'NA'
            });
        } else {
            response.status(422).send({
                status: 'FAILED',
                msg: 'NA'
            });
        }

    });

});

/******************************************************************************
Store User Data in the Temporary Database
******************************************************************************/
function storeUserData(request, userFields, callback) {
    console.log('== Storing User Data\n');

    // Generate salt to be used for the hash then hash the password
    bcrypt.genSalt(saltRounds, function(error, salt) {
        // Genrate the hash from the password and salt then create the User
        bcrypt.hash(userFields.password, salt, function(error, hash) {
            // Create a new User from the mongoose model from provided data
            // Unknown data will be left as the default
            var newUser = new models.User({
                profile: {
                    firstname: userFields.firstname,
                    lastname: userFields.lastname,
                    birthday: userFields.birthday,
                    phone: userFields.phone,
                    location: userFields.location
                },
                vehicle: {
                    make: userFields.make,
                    model: userFields.model,
                    insurance: userFields.insurance
                },
                authentication: {
                    local: {
                        email: userFields.email,
                        password: hash
                    }
                }
            });

            // Insert the User into the database
            request.database.collection('users').insert(newUser, function(error, newUser) {
                if (error) { callback(false); }
                else { callback(true); }
            });

        });

    });
}

module.exports = router;
