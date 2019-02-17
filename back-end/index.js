const http = require("http")
const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const multer = require('multer');
const WebSocket = require('ws');
const websocketServer = require('ws').Server;
const database = require('./database');

var app = express();
var port = process.env.PORT || 80;

app.use('/assets', express.static(path.join(__dirname, '../assets')));

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

var count = 0;

function writeSound(url, name) {
	//result = "<script>var "+counter+"= new Audio(\"../"+url+"\");</script>";
	result = "<script>a["+count+"]= new Howl({src: [\'"+url+"\']});</script>";
	//result += "<div class=\"tile\" onclick=\"a["+count+"].play();socket.send(\'"+count+"\');\">";
	result += "<div class=\"tile\" onclick=\"socket.send(\'"+count+"\');a["+count+"].play();\">";
	result += "<span>"+name+"</span>";
	result += "</div>";
	count += 1;

	return result;
}

app.get('/stylesheet.css', function(req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/stylesheet.css', 'utf8'));
	res.end();
});

app.get('/howler.min.js', function(req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/howler.min.js', 'utf8'));
	res.end();
});

app.get('/', function (req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/tool_bar.html', 'utf8'));
	buffer = (fs.readFileSync(__dirname + '/../front-end/soundtesterbody.html', 'utf8'));
	buffer += (fs.readFileSync(__dirname + '/../front-end/footer.html', 'utf8'));
	//query database to get sounds
	count = 0;
	var tileCode = "<script>var a=[];</script>";
	var con = database.getConnection();
	con.query("select sF.filePath,sF.fileName from soundFiles sF", function(error, results, fields) {
		for (let i = 0; i < results.length; i++) {
			tileCode += writeSound(results[i].filePath, results[i].fileName);
		}
		tileCode += "<button>play sounds</button>";

		buffer = buffer.replace('*here*', tileCode);
		res.write(buffer);
		res.end();
	});
	con.end();
});

app.get('/create', function(req, res) {
	res.write(fs.readFileSync(__dirname + '/../front-end/tool_bar.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/create.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../front-end/footer.html', 'utf8'));
	res.end();
});

app.post('/submit-sound', upload.single('sound'), function(req, res) {
	if (req.file != undefined) {
		var name = req.body.name;
		var con = database.getConnection();
		con.query("insert into soundFiles values("+con.escape(name)+", "+con.escape(req.file.path)+", null, null)", function(error, results, fields) {
			console.log("error: "+error);
			console.log("result: "+results);
		});
		con.end();
	}
    res.redirect('/');
});

//opening our express app through the http server
var server = http.createServer(app);
server.listen(port);

//ws server
const wss = new websocketServer({server: server});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

console.log("live on port "+port);
