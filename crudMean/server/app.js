var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var port = 3000;
var app = express();

app.use('/', function(req, res){
    res.send("I am up & running at port: " + port);
});

app.listen(port, function(){
    console.log('Server started on port ' + port);
});