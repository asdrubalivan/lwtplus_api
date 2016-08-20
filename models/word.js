'use strict';
module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define('Word', {
    word: DataTypes.STRING,
    meaning: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    id_language: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Word;
};