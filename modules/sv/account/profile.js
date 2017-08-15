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
        secure: true,
		userData: 	{
			firstName: request.user.profile.firstname,
			lastName: request.user.profile.lastname,
			birthday: request.user.profile.birthday,
			phone: request.user.profile.phone,
			insurance: request.user.vehicle.insurance,
			make: request.user.vehicle.make,
			model: request.user.vehicle.model
		}
    });
});

module.exports = router;
