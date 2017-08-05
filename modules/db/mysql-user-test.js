var mysqlPool = require(dbcon.js).mysqlPool;

/******************************************************************************
Store User Data in the MySQL Database
******************************************************************************/
function testMySQLStore(request, userFields) {

    mysqlPool.getConnection(function (error, connection) {

        if(error){ console.log(error); return; }

        connection.query("INSERT INTO `ds_driver` (`username`, `password`, `fName`, `lName`, `distance`, `minutes`, `emergency_minutes`, `employer_username`, `insurance_username`)VALUES(?,?,?,?,0,0,0,?,?);",
            [userFields.email, userFields.password, userFields.firstname, userFields.lastname, 'NA', userFields.insurance],
            function(error, rows, fields){
                if(error){ console.log(error); return; }
                console.log('== User Added');
        });

    });

}
