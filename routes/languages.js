var models = require('../models');

var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
  console.log(models);
  models.Language.findAll().then((langs)=>{
    res.send(langs);
  });
});

module.exports = router;
