const jwt = require("jwt-simple");
const _ = require('lodash');
const express = require('express');
const moment = require('moment');

var router = express.Router();
router.post('/token', function (req, res) {
    var post = _.pick(req.body, ['id', 'pass']);
    if (post.id === 'test' && post.pass === "test") {
        var expiration = moment().add(15, 'minutes').toDate();
        var tokenData = _.merge(post, {expiration: expiration});
        let token = jwt.encode(tokenData, "my-secret"); //TODO Change
        res.json({token: token});
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
