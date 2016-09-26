const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./utils/passportutils');
var jwt = require("jwt-simple");
const _ = require('lodash');
var routes = {};
['languages','words', 'texts'].forEach((val) => {
  routes[val] = require(`./routes/${val}`);
});
const app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/languages',routes.languages);
app.use('/words',routes.words);
app.use('/texts',routes.texts);
app.post('/token', function (req, res) {
    var post = _.pick(req.body, ['id', 'pass']);
    console.log('POST', post);
    if (post.id === 'test' && post.pass === "test") {
        let token = jwt.encode(post, "mysecret"); //TODO Change
        res.json({token: token});
    } else {
        res.sendStatus(401);
    }
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
