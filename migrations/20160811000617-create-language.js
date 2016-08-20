'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Languages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Languages');
  }
};
