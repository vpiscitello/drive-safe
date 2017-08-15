var path = require('path'),
    fs = require('fs'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    models = require(__dirname + '/../../db/models.js')(),
    mysqlPool = require(__dirname + '/../../db/dbcon.js').mysqlPool;

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


    checkUserData(request, userFields, function(valid, msg) {
        if (valid) {
            storeUserData(request, userFields, function(valid) {
                if (valid) {
                    response.status(200).send({
                        status: 'SUCCESS',
                        msg: 'Your account was successfully registered!'
                    });
                } else {
                    response.status(422).send({
                        status: 'FAILED',
                        msg: 'There was an issue storing your registration data! Please try again!'
                    });
                }
            });
        } else {
            response.status(422).send({
                status: 'FAILED',
                msg: msg
            });
        }
    });

});

/******************************************************************************
Store User Data in the Temporary Database
******************************************************************************/
function checkUserData(request, userFields, callback) {

    console.log('== Checking User Data\n');

    checkUserFields(userFields, function(valid) {
        if (!valid) {
            console.log('== There was an issue with one of the fields');
            return callback(false, 'One of the fields was not valid! Please re-enter your information and try again!');
        } else {
            checkAgainstEmails(request, userFields.email, function(valid) {
                if (!valid) {
                    console.log('== There email provided is already in use');
                    return callback(false, 'The email you entered is already in use!');
                }
                else {  return callback(true, null); }
            });
        }
    });

}

/******************************************************************************
Check User Fields for Validatity
******************************************************************************/
function checkUserFields(userFields, callback) {

    console.log('== Checking Fields Recieved\n');

    if (!(userFields.firstname.length > 0)) { return callback(false); }

    if (!(userFields.lastname.length > 0)) { return callback(false); }

    if (!(userFields.phone.length > 0)) { return callback(false); }

    if (!(userFields.birthday.length > 0)){ return callback(false); }

    if (!(userFields.location.length > 0)) { return callback(false); }

    if (!(userFields.make.length > 0)) { return callback(false); }

    if (!(userFields.model.length > 0)) { return callback(false); }

    if (!(userFields.insurance.length > 0)) { return callback(false); }

    if(!((/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(userFields.email))) { return callback(false); }

    if(!(userFields.password.length > 8)) { return callback(false); }

    if(!(/[A-Z]/.test(userFields.password))) { return callback(false); }

    if(!(/[0-9]/.test(userFields.password))) { return callback(false); }

    if(/^[a-zA-Z0-9- ]*$/.test(userFields.password)) { return callback(false); }

    return callback(true);

}

/******************************************************************************
Check Email Against Current Emails
******************************************************************************/
function checkAgainstEmails(request, email, callback) {

    console.log('== Checking Emails in Database\n');

    request.database.collection('users').findOne({
        'authentication.local.email': email
    }, function(error, checkUser) {
        if(checkUser) {
            return callback(false);
        } else {
            return callback(true);
        }
    });

}

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

            saveToMongoInstance(request, newUser, function(error) {
                if (!error) {
                    saveToMySQLInstance(request, newUser, function(error) {
                        if (!error) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    });
                } else { callback(false); }
            });

        });

    });
}

function saveToMongoInstance(request, newUser, callback) {
    request.database.collection('users').insert(newUser, function(error, newUser) {
        if (error) { return callback(true); }
        else { return callback(false); }
    });
}

function saveToMySQLInstance(request, newUser, callback) {
    mysqlPool.getConnection(function (error, connection) {
        if(error){ console.log(error); return callback(true); }
        connection.query("INSERT INTO `ds_driver` (`username`, `password`, `fName`, `lName`, `distance`, `minutes`, `emergency_minutes`, `employer_username`, `insurance_username`)VALUES(?,?,?,?,0,0,0,?,?);",
            [newUser.authentication.local.email, newUser.authentication.local.password, newUser.profile.firstname, newUser.profile.lastname, 'NA', 'NA'],
            function(error, rows, fields){
                if(error){ console.log(error); return callback(true); }
                return callback(false);
        });
    });
}

module.exports = router;
