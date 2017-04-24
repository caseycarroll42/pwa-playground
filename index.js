var express = require('express')
var path = require('path')
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var app = express();
var port = 3333;
var ROOT_DIR = 'app';

app.use(express.static(ROOT_DIR))    

var server = app.listen(port, function() {
	var host = "localhost"
	var port = server.address().port
	console.log('Server running at http://%s:%s', host, port)
})

// Connection URL
var url = 'mongodb://67.205.173.163:27017/mean-dev';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

	db.collection('documents').find().toArray(function (err, result) {
    	if (err) throw err
    	console.log(result)
	})
	db.close();
});
