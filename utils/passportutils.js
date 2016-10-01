'use strict';

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const _ = require('lodash');
var User = require('../models').User; 
var opts = {};
opts.secretOrKey = 'my-secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    var exp = new Date(jwt_payload.expiration);
    var now = new Date();
    if (exp > now) {
        User.whereUser(jwt_payload.user).then(function (user) {
            if (user) {
                done(null, user);
            }  else {
                done(null, false, {message: 'User not found'});
            }
        }).error(function (err) {
            done(err);
        });
    } else {
        done(null, false, {message: 'Token expired'});
    }
}));

module.exports = {
    initialize: () => {
        return passport.initialize();
    },
    authenticate: () => {
        return passport.authenticate("jwt", {session: false});
    }
}
