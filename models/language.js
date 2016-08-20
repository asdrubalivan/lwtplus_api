'use strict';
module.exports = function(sequelize, DataTypes) {
  var Language = sequelize.define('Language', {
    code: {
      type: DataTypes.STRING(2),
      unique: true,
    },
    name:{
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    left_to_right: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    remove_spaces: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    split_each_char: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    regex_split_sentences: {
      type: DataTypes.STRING(32),
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Language;
};
