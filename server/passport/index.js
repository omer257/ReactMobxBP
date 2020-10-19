const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
 
passport.use(new LocalStrategy(function (username, password, done) {
	if ((username === "john") && (password === "john")) {
		return done(null, { username: username, id: 1 });
	} else {
		return done(null, false);
	}
}));

module.exports = passport
