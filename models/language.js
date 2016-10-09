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
      },
      langBelongsToUser: function (idLang, idUser) {
          let sql = `select 1 as exist from "Languages" l 
            where l.id = ? and l.id_user = ? limit 1`;
        return sequelize.query(sql, {
           replacements: [idLang, idUser],
           type: sequelize.QueryTypes.SELECT
        });
      }
    }
  });
  return Language;
};
