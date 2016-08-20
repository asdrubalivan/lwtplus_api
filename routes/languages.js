var models = require('../models');

var express = require('express');
var _ = require('lodash');
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
    res.send(langs);
  },() => { res.sendStatus(500); });
});

router.get('/:id', (req, res) => {
  models.Language.find({
    where: {
      id: req.params.id
    }
  }).then((lang) => {
    if (!_.isNull(lang)) {
      res.send(lang);
    } else {
      res.sendStatus(404);
    }
  }, (err) => {
    res.status(500).send(err);
  });
});

router.post('/', (req, res) => {
  let languageParams = getLanguageParams(req.body);
  models.Language.create(languageParams)
  .then((lang) => {
    res.send(lang);
  }, (err) => {
    res.status(500).send({
      error: err
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
      res.sendStatus(404);
    });
  });
});

router.delete('/:id',(req, res) => {
  let condition = {
    where: {
      id: req.params.id
    }
  };
  models.Language.destroy(condition)
  .then((destroyed) => {
    res.send({
      rowsDestroyed: destroyed
    });
  }, (err) => {
    res.status(500).send({
      error: err
    });
  });
});

module.exports = router;
