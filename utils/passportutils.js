'use strict';

const passport = require('passport');  
const Strategy = require('passport-local');

passport.use(new Strategy(  
  function(username, password, done) {
    // database dummy - find user and verify password
    // TODO Doing a auth based on database
    if(username === 'test' && password === 'test'){
      done(null, {
        id: 1,
        firstname: 'test',
        lastname: 'test',
        email: 'test',
        verified: true
      });
    }
    else {
      done(null, false);
    }
  }
));

module.exports = passport; 
