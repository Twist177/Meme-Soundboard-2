const mysql = require('mysql');

module.exports = {
	getConnection: function() {
		//database info
		var con = mysql.createConnection({
		  host     : '35.232.110.39',
		  user     : 'root',
		  password : 'meme',
		  database : 'memes'
		});
		//handle errors in connection
		con.connect(function(err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
		});
		/*con.query('SELECT * FROM users', function (error, results, fields) {
			if (error) throw error;
			console.log('The solution is: ', results[0].userName);
		});*/
		return con;
	}
}
