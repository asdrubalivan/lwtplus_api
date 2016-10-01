const jwt = require("jwt-simple");
const _ = require('lodash');
const express = require('express');
const moment = require('moment');
var User = require('../models').User;

var router = express.Router();
router.post('/token', function (req, res) {
    var post = _.pick(req.body, ['user', 'pass']);
    User.whereUser(post.user)
        .then(function (user) {
           if (user.validatePassword(req.pass)) {
            let expiration = moment().add(15, 'minutes').toDate();
            let tokenData = _.merge(post, {expiration: expiration});
            let token = jwt.encode(tokenData, "my-secret"); //TODO Change
            res.json({token: token});
           } else {
            res.sendStatus(401);
           }
        })
        .error(function (error) {
            res.status(500).send(error);
        });
    });

module.exports = router;
