'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('words', {
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      word: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meaning: Sequelize.STRING,
      grade: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      id_language: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        references: {
            model: 'languages',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false,
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('words');
  }
};
