'use strict';

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const _ = require('lodash');
var opts = {};
opts.secretOrKey = 'my-secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    var exp = new Date(jwt_payload.expiration);
    var now = new Date();
    if (jwt_payload.id === 'test' 
        && jwt_payload.pass === 'test'
        && exp > now) {
        return done(null, _.pick(jwt_payload,['id', 'pass']));
    } else {
        return done(null, false);
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
