// Libraries
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

var server = require('http').createServer(app);
var io = require('socket.io')(server);



// MongoDB configuration
const url = 'mongodb://localhost:27017';
const dbName = 'pq';

var m_con;
MongoClient.connect(url, function(err, client) {
	console.log("Connected to MongoDB instance successfully");
	const db = client.db(dbName);
	m_con = db;
});

//Setup
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
var router = express.Router();



// API

//For registration
router.post('/register', function(req, res) {
	var prepareJson = req.body;
	prepareJson['priority'] = -1;
	prepareJson['timestamp'] = Math.floor(Date.now());
	m_con.collection('patients').insertOne(req.body);
	res.json({
		message: '17 min' //hardcoded as ETA module is not yet done
	});
	io.sockets.emit('broadcast', 'update_queue');
});

// To retrive queue
router.get('/queue', function(req, res) {
	m_con.collection('patients').find({}).toArray(function(err, docs) {
		res.json(docs);
	});
});

// To update
router.post('/patient', function(req, res) {
	var id = req.body._id;
	var level = req.body.priority;
	m_con.collection('patients').updateOne({_id: new mongo.ObjectID(id)}, {$set: {priority: level}}, function(err, r) {
	io.sockets.emit('broadcast', 'update_queue');
	});

});



// API prefix
app.use('/api', router);
// Configuration
app.use(express.static(__dirname));

server.listen(8080);
console.log('Closing mongodb client');