var url = 'http://localhost:9999';



var list = document.getElementById('libList');



function test(){
var req = new XMLHttpRequest();
			//var payload = {};
			//payload.username = 'JSMITH';
			//payload.password = 'password';
	req.open('GET', url + '/getDrivers' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			console.log(req.responseText);
			tester.textContent = req.responseText;
		} else {
			console.log('Error');
		}
	});
	req.send(null);	
}
//test();
			var dt = document.createElement('dt');
			dt.textContent='Open driveSafe_tester.js in public/js to view add_driver example';
			list.appendChild(dt);
function testAddDriver(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'DMarkovic';
			payload.password = 'password';
			payload.fName='Dylan';
			payload.lName='Markovic';

	req.open('POST', url + '/add_driver' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			console.log('success');
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

//testAddDriver();

function testDriverLogin(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.password = 'password';

	req.open('POST', url + '/driver_login' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='driver login JSON:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testDriverLogin();

function testAddMiles(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.password = 'password';
			payload.distance ='20';

	req.open('POST', url + '/add_miles' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='add_miles:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testAddMiles();

function testAddMinutes(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.password = 'password';
			payload.minutes ='40';

	req.open('POST', url + '/add_minutes' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='add_minutes:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testAddMinutes();

function testAddEmerg(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.password = 'password';
			payload.emergency_minutes ='12';

	req.open('POST', url + '/add_emergency_minutes' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='add_emergency_minutes:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testAddEmerg();

function testDriverReport(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.password = 'password';

	req.open('POST', url + '/driver_report' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='driver_report json:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testDriverReport();

function testEmployerReport(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.employer_username = 'TARGET';

	req.open('POST', url + '/employer_report' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='employer_report json:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testEmployerReport();

function testInsuranceReport(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'JSMITH';
			payload.insurance_username = 'GEICO';

	req.open('POST', url + '/insurance_report' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='insurance_report json:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testInsuranceReport();

function testParentReport(){
var req = new XMLHttpRequest();
			var payload = {};
			payload.username = 'ADOE';
			payload.parent_username = 'RDOE';

	req.open('POST', url + '/parent_report' , true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var dt = document.createElement('dt');
			dt.textContent='parent_report json:';
			list.appendChild(dt);
			var dd = document.createElement('dd');
			dd.textContent=req.responseText;
			list.appendChild(dd);
		} else {
			console.log('Error');
		}
	});
	req.send(JSON.stringify(payload));	
}

testParentReport();



	
			
