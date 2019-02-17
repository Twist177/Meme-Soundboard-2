const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
var app = express();

app.get('/', function (req, res) {
	res.write(fs.readFileSync(__dirname + '/../header.html', 'utf8'));
	res.write(fs.readFileSync(__dirname + '/../home.html', 'utf8'));
	res.end();
})

var server = app.listen(process.env.PORT || 80, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
