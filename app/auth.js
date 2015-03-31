var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

passport.use(new LocalStrategy(function(username, password, done) {
  return done(null, {
    username: username,
    password: password
  });
}));

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.route('/login')
      .get(function(req, res) {
        res.render('login');
      })
      .post(
      passport.authenticate('local'),
      function(req, res) {
        res.redirect('/');
      }
  );
  app.post('/logout', function(req, res) {

    req.logout();
    res.redirect('/');

  });
};


