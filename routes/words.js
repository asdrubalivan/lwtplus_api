var models = require('../models');

var express = require('express');
var _ = require('lodash');
var router  = express.Router();
var selectwordsutils = require('../utils/selectwordsutils');
function getWordParams(params) {
  return {
    word: params.word,
    meaning: params.meaning,
    grade: params.grade,
    id_language: params.id_language,
  };
}

function isWordEditableMiddleware(req, res, next) {
    models.Word
        .wordBelongsToUser(req.params.id, req.user.id)
        .then(function (data) {
            if (_.get(data,'0.exist', 0) === 1) {
                next();
            } else {
                res.sendStatus(401);
            }
        });
}


router.get('/', (req, res) => {
  models.Word.findAll().then((words)=>{
    res.send(words);
  });
});

router.get('/wordsintext/:textid', (req, res) => {
    models.Word
        .selectWordsInText(req.params.textid)
        .then((words) => {
        res.send(words);
    });
    
});

router.get('/countwordsintext/:textid', (req, res) => {
    models.Word
        .countWordsInText(req.params.textid)
        .then((words) => {
        res.send(words[0]); //This is always going to return one object
    });
    
});

router.get('/:id' ,isWordEditableMiddleware, (req, res) => {
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

router.put('/:id',isWordEditableMiddleware, (req, res) => {
  /*
    TODO Change
    express deprecated res.send(status, body): Use res.status(status).send(body) instead routes/Words.js:50:9

  */
  let wordParams = getWordParams(req.body);
  models.Word.update(wordParams,{
    where: {
      id: req.params.id
    }
  }).then((word) => {
    res.send(word);
  }, (err) => {
    res.status(500).send({
      error: err,
    });
  });
});

router.delete('/:id',isWordEditableMiddleware,(req, res) => {
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
