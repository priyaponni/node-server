'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var engines = require('consolidate');

var app = express();

app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-titanium-id");
	next();
});


app.use(function (err, req, res, next) {
  console.error('--------------------' + err.stack);
  res.status(500)
    .send({"status": "Error", "error": err});
  next();
});

app.get('/api/getDash', function(req, res){
	var obj = {};
	obj.name = "system";
	obj.alertCode = "red";
	obj.prevAlertCode = "green";
	obj.changeInd = true;
	obj.value = 3;
	res.json(obj);
});

app.get('/api/getAllDash', function(req, response){
	var res = [];

	var obj = {};
	obj.name = "system";
	obj.alertCode = "red";
	obj.prevAlertCode = "green";
	obj.changeInd = true;
	obj.value = 3;
	res.push(obj);

	obj = {};
	obj.name = "attrition";
	obj.alertCode = "green";
	obj.prevAlertCode = "green";
	obj.changeInd = false;
	obj.value = 3;
	res.push(obj);

	obj = {};
	obj.name = "spend";
	obj.alertCode = "red";
	obj.prevAlertCode = "green";
	obj.changeInd = true;
	obj.value = 3;
	res.push(obj);

	obj = {};
	obj.name = "portfolio";
	obj.alertCode = "green";
	obj.prevAlertCode = "green";
	obj.changeInd = false;
	obj.value = 3;
	res.push(obj);

	obj = {};
	obj.name = "security";
	obj.alertCode = "green";
	obj.prevAlertCode = "red";
	obj.changeInd = true;
	obj.value = 3;
	res.push(obj);

	response.json(res);

})

app.get('/oauth', function (req, res) {
  //console.log('CALLING SERVER');
  res.render('oauthcallback.html');
});



app.get('/', function (req, res) {
  //console.log('CALLING SERVER');
  res.cookie('mycookie', 'cookieValue');
  res.render('index.html');
});

var server = app.listen(8980, function () {
  console.log('Express running');
});