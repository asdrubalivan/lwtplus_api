'use strict';

var readfile  = require('../utils/jsonseederutils').readfile;

module.exports = {
  up: function (queryInterface, Sequelize) {
    var users = readfile('users');
    return queryInterface.bulkInsert('Users', users);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users');
  }
};
