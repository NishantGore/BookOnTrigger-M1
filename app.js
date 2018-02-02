var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var armoury = require('./armoury.js');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/bookontrigger');
var ReqSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	src: String,
	dest: String,
	date: String,
	nop: Number,
	budget: Number
});
var Req =mongoose.model('request', ReqSchema );

var FlightSchema = new mongoose.Schema({
	fno: String,
	date: String,
	src: String,
	dest: String,
	class: String,
	vacancy: Number,
	cost: Number
});
var Flight = mongoose.model('flight', ReqSchema);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'html');


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});


app.post('/request',function(req, res){
	request = req.body;

	request.nop = parseInt(request.nop);
	request.budget = parseInt(request.budget);
	console.log(req.body);
	
	Req.create(req.body, function(err, addedObj){
		if(err){
			console.log('Some error occured while inserting record');
		} else {
			console.log(addedObj);
			console.log('Inserted successfully');
		}
	});

	res.redirect('/');
});



app.listen(8000, function(){
	console.log('Started on port 8000');
});

armoury.sendmail("salil.gtm@gmail.com", "This is sample message");

setInterval(function(){
	armoury.func(Req, Flight)
	}, 5000);