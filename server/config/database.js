
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'quantifi'
});
var json = function(data) {
	data = JSON.stringify(data);
	data = JSON.parse(data);
	return data;
}

let dataBaseconnection = {
	query : function(query, callback) {
		connection.query(query, function(error, rows) {
			if(error) {
				console.log(error);
			}
			else {
				callback(json(rows));
			}
		})
	},

	escape : function (query) {
	    return connection.escape(query);
	},

	closeConnection : function(callback) {
		connection.end(callback);
	}
}
module.exports = dataBaseconnection;