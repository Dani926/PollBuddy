var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var mongoConnection = require('../modules/mongoConnection.js');
mongoConnection.connect(function(err, client){
	if(err) console.error(err);
});
var db = mongoConnection.getDB();
// GET users listing.
router.get('/', function(req, res, next) {
  db.collection("polls").find({}).toArray(function(err, result){
		res.send(result);
	});
});
router.get('/:id/', function(req, res, next) {
	var id = req.params.id;
	db.collection("polls").find(ObjectID(id)).toArray(function(err,result){
		if(err)throw err;
		res.send(result);
	});
	res.send('i am getting poll ID: ' + id);
});

module.exports = router;
