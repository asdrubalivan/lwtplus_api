'use strict';


var readfile  = require('../utils/jsonseederutils').readfile;
module.exports = {
  up: function (queryInterface, Sequelize) {
    var words = readfile('words');
    return queryInterface.bulkInsert('Words', words);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Words');
  }
};
