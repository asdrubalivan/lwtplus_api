const jwt = require("jwt-simple");
const _ = require('lodash');
const express = require('express');
const moment = require('moment');
var User = require('../models').User;

var router = express.Router();
router.post('/token', function (req, res) {
    req
        .checkBody('user','Invalid or empty user')
        .notEmpty()
        .isAlpha();
    req
        .checkBody('pass','Invalid or empty password')
        .notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.status(401).send({
            hasErrors: true,
            errors: errors
        });
        return;
    }
    var post = _.pick(req.body, ['user', 'pass']);
    User.whereUser(post.user)
        .then(function (user) {
           if (user.validatePassword(post.pass)) {
            let expiration = moment().add(15, 'minutes').toDate();
            let tokenData = {
                user: post.user,
                expiration: expiration, 
            };
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
