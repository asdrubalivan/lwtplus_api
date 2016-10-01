var models = require('../models');

var express = require('express');
var _ = require('lodash');
var router  = express.Router();

function getUserParams(params) {
    return _.pick(params, [
        'user',
        'email',
        'password',
        'first_name',
        'last_name'
    ]);
}

router.get('/', (req, res) => {
  //TODO Only allow if this is administrator
  models.User.findAll().then((users)=>{
    res.send(users);
  });
});



router.get('/:id', (req, res) => {
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then((user) => {
    if (!_.isNull(user)) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  }, (err) => {
    res.status(500).send(err);
  });
});

router.post('/', (req, res) => {
  let userParams = getUserParams(req.body);
  models.User.create(userParams)
  .then((user) => {
    res.send(user);
  }, (err) => {
    res.status(500).send({
      error: err,
      sent : userParams
    });
  });
});

router.put('/:id', (req, res) => {
  /*
    TODO Change
    express deprecated res.send(status, body): Use res.status(status).send(body) instead routes/Words.js:50:9

  */ 
  let userParams = getUserParams(req.body);
  models.User.update(userParams,{
    where: {
      id: req.params.id
    }
  }).then((user) => {
    res.send(user);
  }, (err) => {
    res.status(500).send({
      error: err,
    });
  });
});

router.delete('/:id',(req, res) => {
  let condition = {
    where: {
      id: req.params.id
    }
  };
  models.User.destroy(condition)
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
