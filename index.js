const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('./utils/passportutils');
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/auth',require('./routes/auth'));
['languages','words', 'texts'].forEach((val) => {
  var route = require(`./routes/${val}`);
  app.use(`/api/v1/${val}`, passport.authenticate(), route);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
