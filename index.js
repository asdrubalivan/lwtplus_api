var express = require('express');
var bodyParser = require('body-parser');
var routes = {};
['languages','words'].forEach((val) => {
  routes[val] = require(`./routes/${val}`);
});
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/languages',routes.languages);
app.use('/words',routes.words);
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
