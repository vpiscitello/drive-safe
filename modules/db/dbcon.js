var mysql = require('mysql'),
    mysqlHost = process.env.MYSQL_HOST,
    mysqlPort = process.env.MYSQL_PORT || 27017,
    mysqlUser = process.env.MYSQL_USERNAME,
    mysqlPassword = process.env.MYSQL_PASSWORD,
    mysqlDB = process.env.MYSQL_DB,
    mysqlURL = 'mysql://' + mysqlUser + ':' + mysqlPassword + '@' + mysqlHost + ':' + mysqlPort + '/' + mysqlDB;

var mysqlPool = mysql.createPool({
    connectionLimit : 10,
    host            : mysqlHost,
    user            : mysqlUser,
    password        : mysqlPassword,
    database        : mysqlDB,
    port            : mysqlPort
});

module.exports.mysqlPool = mysqlPool;
