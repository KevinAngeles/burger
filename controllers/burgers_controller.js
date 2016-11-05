/*
Functions that will do the routing for this app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	burger.selectAll(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/create', function (req, res) {
	var UTCTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	burger.insertOne(['burger_name', 'devoured', 'date'], [req.body.burger, '0', UTCTime], function () {
		res.redirect('/');
	});
});

router.put('/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.updateOne({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/');
	});
});

module.exports = router;