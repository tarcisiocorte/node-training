<<<<<<< HEAD
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
   res.render('index', {username: 'Tarcisio Corte', path: 'home'});
});

app.get('/about', function(req, res) {
   res.render('about',{path: "about"});
});

app.get('/contact', function(req, res) {
   res.render('contact', {path: "contact"});
});

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'tarcisiocorte@gmail.com',
            pass: ''            
        }
    });

    var mailOptions = {
        from: 'Tarcisio Corte <tarcisiocorte@gmail.com>',
        to: 'tcosta@pobal.ie',
        subject: 'Website submission',
        text: 'You have a submission with the following details....\n Name: '+req.body.name+'Email: '+ req.body.email+'Message: '+req.body.message,
        httml: '<p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else
        {
            console.log('Message sent: ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000);
=======
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
   res.render('index', {username: 'Tarcisio Corte', path: 'home'});
});

app.get('/about', function(req, res) {
   res.render('about',{path: "about"});
});

app.get('/contact', function(req, res) {
   res.render('contact', {path: "contact"});
});

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'tarcisiocorte@gmail.com',
            pass: ''            
        }
    });

    var mailOptions = {
        from: 'Tarcisio Corte <tarcisiocorte@gmail.com>',
        to: 'tcosta@pobal.ie',
        subject: 'Website submission',
        text: 'You have a submission with the following details....\n Name: '+req.body.name+'Email: '+ req.body.email+'Message: '+req.body.message,
        httml: '<p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else
        {
            console.log('Message sent: ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000);
>>>>>>> 9f92f50f8eed708f9ce001438e735f5bc635f234
console.log('Server is running on Port 3000...');