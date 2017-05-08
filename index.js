var express = require('express')
var path = require('path')
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var bodyParser = require('body-parser')

var app = express();
var port = 3333;
var ROOT_DIR = 'app';
var dbURL = 'mongodb://67.205.173.163:27017/mean-dev';
var database;

app.use(express.static(ROOT_DIR));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.post('/postStory', function(req, res) {
	database.collection('documents').save(req.body, (err, result) => {
		if (err) return console.log(err)

		res.redirect('/')
	})
})
