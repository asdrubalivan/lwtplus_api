const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./utils/passportutils');
var jwt = require("jwt-simple");
const _ = require('lodash');
const app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
['languages','words', 'texts'].forEach((val) => {
  var route = require(`./routes/${val}`);
  app.use(`/api/v1/${val}`, passport.authenticate(), route);
});
app.post('/api/v1/token', function (req, res) {
    var post = _.pick(req.body, ['id', 'pass']);
    console.log('POST', post);
    if (post.id === 'test' && post.pass === "test") {
        let token = jwt.encode(post, "my-secret"); //TODO Change
        res.json({token: token});
    } else {
        res.sendStatus(401);
    }
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
