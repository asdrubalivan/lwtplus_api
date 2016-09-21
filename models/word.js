'use strict';
var selectwordsutils = require('../utils/selectwordsutils');
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
      },
      selectWordsInText: function (textid) {
        let sqlObj = selectwordsutils.generateSelectWordsTextSQL({
            textid: textid
        });
        let sql = sqlObj.toParam({numberedParameters: false});
        return sequelize.query(sql.text,{
            replacements: sql.values,
            type: sequelize.QueryTypes.SELECT
        });
      },
      countWordsInText: function(textid) {
          let sqlObj = selectwordsutils.generateCountWordsTextSQL({
            textid: textid
          });
          let sql = sqlObj.toParam({numberedParameters: false});
          return sequelize.query(sql.text,{
            replacements: sql.values,
            type: sequelize.QueryTypes.SELECT
          });
      },
    }
  });
  return Word;
};
