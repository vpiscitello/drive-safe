// load all the things we need
var LocalStrategy = require('passport-local').Strategy,
    models = require(__dirname + '/../../db/models.js')(),
    bcrypt = require('bcrypt');


/******************************************************************************
Passport Strategies
******************************************************************************/

module.exports = function(passport) {

    // Serialize the User for the session
    passport.serializeUser(function(request, user, done) {
        done(null, user._id);
    });

    // Deserialize User for the session
    passport.deserializeUser(function(request, id, done) {
        models.User.findById(
            id
        , function(error, requestedUser) {
            done(error, requestedUser)
        });
    });

    /******************************************************************************
    Local Strategy
    ******************************************************************************/
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(request, email, password, done) {
            request.database.collection('users').findOne({
                'authentication.local.email': email
            }, function(error, requestedUser) {
                // Check password against hash in database
                verifyUserData(request, email, password, function(verified, error, user) {
                    if (verified) {
                        return done(null, user);
                    } else {
                        return done(error, null);
                    }
                });
            });
        }
    ));

};

/******************************************************************************
Support Functions
******************************************************************************/

/******************************************************************************
Verify Data for User login
******************************************************************************/
function verifyUserData(request, email, password, callback) {
    // Find the User in the database and compare it to the requester's data
    request.database.collection('users').findOne({
        // Find by email
        'authentication.local.email': email
    }, function(error, requestedUser) {
        // If there is an error return false and supply a database error notification
        if (error) {
            console.log(error);
            callback(false, null, null);
        }
        // If the requested User has been found compare the provided password with the stored hash
        // If the requested User is not found return false and supply not found email error
        if (requestedUser) {
            console.log('== User found\n');
            var requestedHash = requestedUser.authentication.local.password;

            // Compare the two hashes to determine if the user is authentic
            bcrypt.compare(password, requestedHash, function(error, success) {
                if (success) {
                    console.log('== User login successful\n');
                    callback(true, null, requestedUser);
                } else {
                    console.log('== User login failed\n');
                    callback(false, error, null);
                }
            });

        } else {
            console.log('== No User found\n');
            callback(false, null, null);
        }

    });
}
