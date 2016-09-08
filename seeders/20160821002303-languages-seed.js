'use strict';

var readfile  = require('../utils/jsonseederutils').readfile;

module.exports = {
  up: function (queryInterface, Sequelize) {
    var languages = readfile('languages');
    return queryInterface.bulkInsert('Languages', languages);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Languages');
  }
};
