var models = require('../models');

var express = require('express');
var _ = require('lodash');
var router  = express.Router();

function getWordParams(params) {
  return {
    word: params.word,
    meaning: params.meaning,
    grade: params.grade,
    id_language: params.id_language,
  };
}

router.get('/', (req, res) => {
  models.Word.findAll().then((langs)=>{
    res.send({
      status: 'success',
      Words: langs
    });
  });
});

router.get('/:id', (req, res) => {
  models.Word.find({
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
  let wordParams = getWordParams(req.body);
  models.Word.create(wordParams)
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
    express deprecated res.send(status, body): Use res.status(status).send(body) instead routes/Words.js:50:9

  */
  let wordParams = getWordParams(req.body);
  models.Word.update(wordParams,{
    where: {
      id: req.params.id
    }
  }).then((lang) => {
    res.send({
      status: 'success',
      Word: lang,
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
  models.Word.destroy(condition)
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
