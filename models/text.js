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
      },
      textBelongsToUser: function(idText, idUser) {
          let sql = `select 1 as exist from "Texts" t 
            inner join "Languages" l
                on l.id = t.id_language
            where l.id_user = ? and t.id = ? limit 1`;
        return sequelize.query(sql, {
           replacements: [idUser, idText],
           type: sequelize.QueryTypes.SELECT
        });
      }
    }
  });
  return Text;
};
