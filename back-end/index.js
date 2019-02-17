<<<<<<< HEAD
const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const multer = require('multer');
const database = require('./database');
var app = express();

//filter for file upload
var filter = function fileFilter (req, file, cb) {
  if (file.mimetype.includes("audio")) {
	  cb(null, true);
  }
  else {
	  cb(null, false);
  }
}
//storage settings on upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/sounds/');
  },
  filename: function (req, file, cb) {
	cb(null, Date.now() + path.extname(file.originalname));
  }
})
//settings for uploads
var upload = multer({
  storage: storage, //directory for uploads
  fileFilter: filter
});

app.get('/stylesheet.css', function(req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/stylesheet.css', 'utf8'));
	res.end();
});

app.get('/', function (req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/tool_bar.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/soundtesterbody.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/footer.html', 'utf8'));
	res.end();
});

app.get('/create', function(req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/tool_bar.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/create.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/footer.html', 'utf8'));
	res.end();
});

app.post('/submit-sound', upload.single('sound'), function(req, res) {
	if (req.file != undefined) {
		var con = database.getConnection();
		con.query("insert into soundFiles values(null, "+con.escape(req.file.path)+", null, null)", function(error, results, fields) {
			console.log(results);
		});
		con.end();
	}
    res.redirect('/');
});

var server = app.listen(process.env.PORT || 80, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
=======
const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
var app = express();

app.get('/stylesheet.css', function(req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/stylesheet.css', 'utf8'));
	res.end();
});

app.get('/', function (req, res) {
	//res.write(path.join(__dirname + '/../header.html'));
	//res.write(path.join(__dirname + '/../home.html'));

	/*var con = mysql.createConnection({
	  host     : '35.232.110.39',
	  user     : 'root',
	  password : 'meme',
	  database : 'memes'
	});
	con.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connect as id ' + con.threadId);
	});
	con.query('SELECT * FROM users', function (error, results, fields) {
  		if (error) throw error;
  		console.log('The solution is: ', results[0].userName);
	});
	con.end();*/

	res.write(fs.readFileSync(__dirname + '/../front-end/tool_bar.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/soundtesterbody.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/footer.html', 'utf8'));
	res.end();
})

var server = app.listen(process.env.PORT || 80, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
>>>>>>> cd2c336025925ca3a4f04a915846c553d78a495c
})
