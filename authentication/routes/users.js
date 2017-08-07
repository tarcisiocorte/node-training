var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', 
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash:'Invalid username or password'}), 
  function(req,res){
    console.log('Authentication Successful');
    req.flash('success', 'You are logged in');
    res.redirect('/');
});

/**** 
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: 'Invalid Username or Password'}),
  function(req, res) {
    req.flash('success', 'You are now logged in');
    res.redirect('/');
});
***/

/**** 
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
    User.comparePassword(password, user.password, function(err, isMach){
      if(err) return done(err);
      
      if(isMach){
        console.log(user.username);
        return done(null, user);
      } else {
        console.log('error tarcisio 4');
        return done(null, false, {message: 'Invalid Password'});     
      }
    });

    return done(null, user);
    });
  }
));

***/
passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({ username: username }, function (err, user) {
      if (err) console.log('erro 1'); //throw err;
      if(!user){
        console.log('erro 2');
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMach){
        console.log(isMach);
        if(err) return done(err);
        if(isMach){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/register', upload.single('profileimage'), function(req, res, next){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

if(req.file){
  console.log('Uploading file...');
  var profileimage = req.file.filename;
}else{
  console.log('No file Uploaded...');
  var profileimage = 'noimage.jpg';
}

// Form Validator
req.checkBody('name', 'Name field is required').notEmpty();
req.checkBody('email', 'Email field is required').notEmpty();
req.checkBody('email', 'Valid email').isEmail();
req.checkBody('username', 'username field is required').notEmpty();
req.checkBody('password', 'Password field is required').notEmpty();
req.checkBody('password2', 'Password do not mach').equals(req.body.password);

// Check Erros
var errors = req.validationErrors();

if(errors){
  res.render('register', {
    errors: errors
    });
} else {
  var newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password,
    profileimage: profileimage
  });

  User.createUser(newUser, function(err, user){
    if(err) throw err;
    console.log(user);  
  });

  req.flash('success', 'You are now registered and can login!');
  res.location('/');
  res.redirect('/');
}
});

module.exports = router;