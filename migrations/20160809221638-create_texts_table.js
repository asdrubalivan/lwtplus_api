'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    let max_size_url = 2083;
    return queryInterface.createTable('texts',{
      id : {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      media_file: Sequelize.STRING(max_size_url),
      source_url: Sequelize.STRING(max_size_url),
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
    return queryInterface.dropTable('texts');
  }
};
