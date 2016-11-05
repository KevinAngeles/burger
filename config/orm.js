var connection = require('./connection.js');

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

function objToSql(ob) {
	// column1=value, column2=value2,...
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

// object relational mapper (ORM)
var orm = {
	selectAll: function (tableInput, condition, cb) {
		var queryString = 'SELECT * FROM '+tableInput;
		if(condition != null)
			queryString=queryString+' '+condition;
		queryString=queryString+';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	insertOne: function (tableInput, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + tableInput + ' (' + cols.toString() + ') ' + 'VALUES (' + printQuestionMarks(vals.length) + ') ';

		console.log(queryString);
		connection.query(queryString, vals, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	updateOne: function (tableInput, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + tableInput + ' SET ' + objToSql(objColVals) + ' WHERE ' + condition;

		connection.query(queryString, [tableInput, objToSql(objColVals), condition], function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};

module.exports = orm;