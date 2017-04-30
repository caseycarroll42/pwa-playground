var express = require('express')
var path = require('path')
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var app = express();
var port = 3333;
var ROOT_DIR = 'app';
var dbURL = 'mongodb://67.205.173.163:27017/mean-dev';
var database;

app.use(express.static(ROOT_DIR));

MongoClient.connect(dbURL, function(err, db) {
	assert.equal(null, err);
	
	database = db;
	
	app.listen(port)
})

app.get('/stories', function(req, res) {
	database.collection('documents').find().toArray(function (err, result) {
		if (err) throw err
		res.send(result)
	})
})
