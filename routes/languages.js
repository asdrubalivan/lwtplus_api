var models = require('../models');

var express = require('express');
var router  = express.Router();

function getLanguageParams(params) {
  return {
    code: params.code,
    name: params.name,
    left_to_right: params.left_to_right,
    remove_spaces: params.remove_spaces,
    split_each_char: params.split_each_char,
    regex_split_sentences: params.regex_split_sentences
  };
}

router.get('/', (req, res) => {
  models.Language.findAll().then((langs)=>{
    res.send({
      status: 'success',
      languages: langs
    });
  });
});

router.post('/', (req, res) => {
  let languageParams = getLanguageParams(req.body);
  models.Language.create(languageParams)
  .then((lang) => {
    res.send({
      status: 'success',
      language: lang,
    });
    //TODO Check for an error
  }, (err) => {
    res.send({
      status: 'error',
      error: err,
    });
  });
});

router.put('/:id', (req, res) => {
  /*
    TODO Change
    express deprecated res.send(status, body): Use res.status(status).send(body) instead routes/languages.js:50:9

  */
  let languageParams = getLanguageParams(req.body);
  models.Language.update(languageParams,{
    where: {
      id: req.params.id
    }
  }).then((lang) => {
    res.send({
      status: 'success',
      language: lang,
    }, (err) => {
      res.send({
        status: 'error',
        error: err,
      });
    });
  });
});

module.exports = router;
