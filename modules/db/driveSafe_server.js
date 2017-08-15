//*****************************
//* Dylan Markovic
//* CS340 Final Project Server-Side script
//* Due: 6.9.2017
//******************************/
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host		: 'classmysql.engr.oregonstate.edu',
	user		: 'cs340_markovid',
	password	: 'Salba-0op',
	database	: 'cs340_markovid'
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9999);


app.get('/getDrivers', function(req,res){
	var context = {};
	pool.query("SELECT username, fName, lName FROM ds_driver WHERE 1;",
		function(err, rows, fields){
			if(err){
				console.log(err);
				return;
			}
			//console.log('rows size is: ' + rows.length);
			context.results = rows;
			console.log(JSON.stringify(rows));
			res.send(context);
		});
});

app.post('/add_driver', function(req,res,next){
	//console.log('in add covenant');
	context = {};
		pool.query("INSERT INTO `ds_driver` (`username`, `password`, `fName`, `lName`, `distance`, `minutes`, `emergency_minutes`, `employer_username`, `insurance_username`)VALUES(?,?,?,?,0,0,0,?,?);", 
				[req.body.username, req.body.password, req.body.fName, req.body.lName, req.body.employer_username, req.body.insurance_username],
				function(err, rows, fields){
					if(err){
						next(err);
					return;
					}					
					context.results="Element Added.";
					//console.log(context.results);
					res.send(context);		
					return;
		});	
	
});


app.post('/driver_login', function (req,res){
	var context = {};
	pool.query("SELECT username, fName, lName FROM ds_driver WHERE username=? AND password=?;",[req.body.username, req.body.password],
		function(err, rows, fields){
			if(err){
				console.log(err);
				return;
			}
			//console.log('rows size is: ' + rows.length);
			context.results = rows;
			console.log(JSON.stringify(rows));
			res.send(context);
		});
});

app.post('/add_miles', function (req,res){
	var context = {};
	pool.query("UPDATE ds_driver SET distance=distance+? WHERE username=? AND password=?; ",[req.body.distance, req.body.username, req.body.password],
		function(err, result) {
			if (err) {
				console.log(err);
				return;
			}
			context.results = 'miles update occurred';
		res.send(context);
		});
});

app.post('/add_minutes', function (req,res){
	var context = {};
	pool.query("UPDATE ds_driver SET minutes=minutes+? WHERE username=? AND password=?; ",[req.body.minutes, req.body.username, req.body.password],
		function(err, result) {
			if (err) {
				console.log(err);
				return;
			}
			context.results = 'minutes update occurred';
		res.send(context);
		});
});

app.post('/add_emergency_minutes', function (req,res){
	var context = {};
	pool.query("UPDATE ds_driver SET emergency_minutes=emergency_minutes+? WHERE username=? AND password=?;",[req.body.emergency_minutes, req.body.username, req.body.password],
		function(err, result) {
			if (err) {
				console.log(err);
				return;
			}
			context.results = 'emergency minutes occurred';
		res.send(context);
		});
});

app.post('/driver_report', function (req,res){
	var context = {};
	pool.query("SELECT username, fName, lName, distance, minutes, emergency_minutes FROM ds_driver WHERE username=? AND password=?;",[req.body.username, req.body.password],
		function(err, rows, fields){
			if(err){
				console.log(err);
				return;
			}
			context.results = rows;
			res.send(context);
		});
});

app.post('/employer_report', function (req,res){
	var context = {};
	pool.query("SELECT username, fName, lName, distance, minutes, emergency_minutes FROM ds_driver WHERE username=? AND employer_username=?;",[req.body.username, req.body.employer_username],
		function(err, rows, fields){
			if(err){
				console.log(err);
				return;
			}
			//console.log('rows size is: ' + rows.length);
			context.results = rows;
			res.send(context);
		});
});

app.post('/insurance_report', function (req,res){
	var context = {};
	pool.query("SELECT username, fName, lName, distance, minutes, emergency_minutes FROM ds_driver WHERE username=? AND insurance_username=?;",[req.body.username, req.body.insurance_username],
		function(err, rows, fields){
			if(err){
				console.log(err);
				return;
			}
			//console.log('rows size is: ' + rows.length);
			context.results = rows;
			res.send(context);
		});
});

app.post('/parent_report', function (req,res){
	var context = {};
	pool.query("SELECT d.username, d.fName, d.lName, d.distance, d.minutes, d.emergency_minutes FROM ds_driver d INNER JOIN ds_driver_parent dp ON d.username=dp.driver_username INNER JOIN ds_parent p ON p.username=dp.parent_username WHERE d.username=? AND p.username=?;",[req.body.username, req.body.parent_username],
		function(err, rows, fields){
			if(err){
				console.log(err);
				return;
			}
			//console.log('rows size is: ' + rows.length);
			context.results = rows;
			res.send(context);
		});
});

app.get('/',function(req,res){
	var context = {};
	context.results = "Should be successful";
	res.render('home',context);
});

app.post('/', function(req,res){
	var context = {};
	context.results ="post '/' sent";
	res.render('home', context);
});

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(req,res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'), function(){
	console.log('Express started on flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

