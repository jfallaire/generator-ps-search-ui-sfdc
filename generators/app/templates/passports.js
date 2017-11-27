var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('./config');

//users array to hold
var users = [];

function findByEmail(email, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if ((user.nameID || user.id) === email) {
        // if (user.email === email) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    // done(null, user.email);
    done(null, user.nameID || user.id);
});

passport.deserializeUser(function(id, done) {
    findByEmail(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: config.auth.google.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    findByEmail(profile.id, function(err, user) {
            console.log(JSON.stringify(profile))
          if (err) {
              return cb(err);
          }
          if (!user) {
              users.push(profile);
              return cb(null, profile);
          }
          return cb(null, user);
      })
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.use(new SamlStrategy({
        issuer: config.auth.okta.issuers[process.env.OKTA_ENV || 'devLocal'],
        path: config.auth.okta.path,
        entryPoint: config.auth.okta.entryPoint,
        logoutUrl: config.auth.okta.logoutUrl,
        cert: config.auth.okta.cert
    },
    function(profile, done) {
        console.log('Succesfully Profile' + profile);
        console.log(profile);
        // if (!profile.email) {
        if (!profile.nameID) {
            return done(new Error("No email found"), null);
        }
        process.nextTick(function() {
            console.log('process.nextTick' + profile);
            findByEmail(profile.nameID, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    users.push(profile);
                    return done(null, profile);
                }
                console.log('Ending Method for profiling');
                return done(null, user);
            })
        });
    }
));

passport.protected = (req, res, next) => {
    console.log('Login Profile =>' + req.isAuthenticated());
    console.log(req.user ? (req.user.nameID || req.user.id ):'');
    
    if (req.isAuthenticated()) {
        return next();
    } 
    console.log('login please >>' + req.isAuthenticated());
    req.session.redirect_to = req.originalUrl; 
    res.redirect('/login');
    
};

exports = module.exports = passport;