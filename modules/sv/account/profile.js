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
			location: request.user.profile.location,
			email: request.user.authentication.local.email,
			lastName: request.user.profile.lastname,
			birthday: request.user.profile.birthday,
			phone: request.user.profile.phone,
			insurance: request.user.vehicle.insurance,
			make: request.user.vehicle.make,
			model: request.user.vehicle.model
		}
    });
});



router.get('/updateProfile', function(request, response, next) {
	console.log('== Received New Update Profile Request\n');
	response.status(200).render('profileUpdate', {
		title: 'Drive Safe',
		pagestyle: 'profile',
		secure: true,
		userData: 	{
			firstName: request.user.profile.firstname,
			location: request.user.profile.location,
			email: request.user.authentication.local.email,
			lastName: request.user.profile.lastname,
			birthday: request.user.profile.birthday,
			phone: request.user.profile.phone,
			insurance: request.user.vehicle.insurance,
			make: request.user.vehicle.make,
			model: request.user.vehicle.model
		}
	});
});

router.post('/updateProfile', function(request, response, next) {
	console.log('== Received New Update Profile Request\n');
	request.database.collection('users').find(
	{"authentication.local.email": }).toArray(function(err, response) {
		if(response) {
		console.log(response);		
		}
});
		});




module.exports = router;
