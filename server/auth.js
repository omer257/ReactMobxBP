const express = require('express');
const router = express.Router()
const path = require('path');

const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Handle when login details are sent
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?err',
}));

//Simulate return of user data
router.get('/userDetails', function (req, res) {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.redirect('/login');
    }
});

// Catch all other routes and return the index file
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/login.html'));
});
//log the user and kill the session
router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged out!');
});


//The serializeUser function defines what will be saved in the session object.
passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user);
});

//This allows passport to decrypt the session ID and the user information
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//Chosen strategy of local users
passport.use(new LocalStrategy(
    //    { passReqToCallback : true},
    function (username, password, done) {
        if ((username === "john") && (password === "password")) {
            return done(null, { username: username, id: 1 });
        } else {
            return done(null, false, "Failed to login.");
        }
    }
));

 
module.exports = router
