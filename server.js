const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const auth = require('./server/auth')
const api = require('./server/api')
const app = express()
const port = process.env.PORT || 5000


let DummyData = [{name:'Burger'},{name:'Pizza'},{name:'Sushi'},]

//Allow cross domain access
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Authentication middleware
app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());//Start passport
app.use(passport.session());//Allow session
//Basic error handler
app.use((err, req, res, next) => {
    res.status(500).send(err);
});
//Use auth
app.use(auth)
//Use api
app.use(api)

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Reusable function to check if user is auth, can be injected as another param like example below
function authOnly(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}
 
// Point static path to dist
app.use(authOnly, express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', authOnly, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))