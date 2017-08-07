var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connetion;

//user schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne({query, callback});
}

module.exports.comparePassword = function(candidatePassowrd, hash, callback){
    console.log('comparePassword - start');
    bcrypt.compare(candidatePassowrd, hash, function(err, isMach) {
        callback(null, isMach);
        console.log('comparePassword - end');
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);   
        });
    });
}