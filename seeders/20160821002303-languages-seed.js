'use strict';

var jsonseederutils  = require('../utils/jsonseederutils');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var languages = jsonseederutils.readfile('languages');
    return queryInterface.bulkInsert('Languages', languages);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Languages');
  }
};
