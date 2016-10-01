'use strict';

const bcrypt = require('bcrypt-as-promised');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user: {
        type: Sequelize.STRING(64),
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    } 
    email: {
        type:  DataTypes.STRING(255),
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validatePassword: function (password) {
          return bcrypt.compare(password, this.password);
      }
    }
  });
  return User;
};
