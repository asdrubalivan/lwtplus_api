var models = require('../models');

var express = require('express');
var _ = require('lodash');
var router  = express.Router();

function getTextParams(params) {
  return {
    title: params.title,
    content: params.content,
    media_file: params.media_file,
    source_url: params.source_url,
    id_language: params.id_language
  };
}

router.get('/', (req, res) => {
  models.Text.findAll().then((texts)=>{
    res.send(texts);
  },() => {
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {
  models.Text.find({
    where: {
      id: req.params.id
    }
  }).then((text) => {
    if (!_.isNull(text)) {
      res.send(text);
    } else {
      res.sendStatus(404);
    }
  }, (err) => {
    res.status(500).send(err);
  });
});

router.post('/', (req, res) => {
  let textParams = getTextParams(req.body);
  models.Text.create(textParams)
  .then((text) => {
    res.send(text);
  }, (err) => {
    res.status(500).send({
      error: err
    });
  });
});

router.put('/:id', (req, res) => {
  /*
    TODO Change
    express deprecated res.send(status, body): Use res.status(status).send(body) instead routes/Texts.js:50:9

  */
  let textParams = getTextParams(req.body);
  models.Text.update(textParams,{
    where: {
      id: req.params.id
    }
  }).then((text) => {
    res.send(text)
  }, (err) => {
    res.status(500).send({
      error: err
    });
  });
});

router.delete('/:id',(req, res) => {
  let condition = {
    where: {
      id: req.params.id
    }
  };
  models.Text.destroy(condition)
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
