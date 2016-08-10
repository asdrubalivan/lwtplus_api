'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('languages',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING(2),
        unique: true
      },
      name:{
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      left_to_right: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      remove_spaces: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      split_each_char: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      regex_split_sentences: {
        type: Sequelize.STRING(32),
        allowNull: false,
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('languages');
  }
};
