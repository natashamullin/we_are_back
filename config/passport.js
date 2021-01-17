const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const connection = require('./connection');
const User = require('../models');

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.findOne({ username: email }), function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return(done(null, false, { message: 'Invalid e-mail address' }));
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
    }
))