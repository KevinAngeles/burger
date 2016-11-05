var mysql = require('mysql');

var mysqlConnection = require('./mysqlcon.js');

/*
mysqlConnection should be an object with the following attributes:
{
	host: 'change host',
	user: 'change user',
	password: 'change password',
	database: 'burgers_db'
}*/

var connection = mysql.createConnection(mysqlConnection);


connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
