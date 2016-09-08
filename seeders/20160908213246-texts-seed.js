'use strict';

var readfile  = require('../utils/jsonseederutils').readfile;

module.exports = {
  up: function (queryInterface, Sequelize) {
    var texts = readfile('texts');
    return queryInterface.bulkInsert('Texts', texts);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Texts');
  }
};
