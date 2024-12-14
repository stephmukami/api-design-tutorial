const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const bcrypt = require('bcrypt'); 
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usermodel');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the login route' });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', 
      passwordField: 'password', 
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Passport sessions and serialization/deserialization
passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize only the user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).send({ success: false, message: 'Server error during login' });
    }
    if (!user) {
      return res.status(401).send({ success: false, message: info.message || 'Authentication failed' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send({ success: false, message: 'Login error' });
      }
      return res.status(200).send({ success: true, message: 'Login successful' }); //could have returned response or message
    });
  })(req, res, next); 
});

module.exports = router;