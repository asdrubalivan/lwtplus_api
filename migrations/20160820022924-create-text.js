'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    let max_size_url = 2083;
    return queryInterface.createTable('Texts', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      media_file: Sequelize.STRING(max_size_url),
      source_url: Sequelize.STRING(max_size_url),
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
    return queryInterface.dropTable('Texts');
  }
};
