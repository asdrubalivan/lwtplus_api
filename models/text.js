'use strict';
module.exports = function(sequelize, DataTypes) {
  var Text = sequelize.define('Text', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    media_file: DataTypes.STRING,
    source_url: DataTypes.STRING,
    id_language: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Text;
};