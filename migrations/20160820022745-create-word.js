'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Words', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
            model: 'Languages',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Words');
  }
};
