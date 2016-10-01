'use strict';

const bcrypt = require('bcrypt-as-promised');
const bcryptSync = require('bcrypt');

const ROUNDS = 10;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user: {
        type: DataTypes.STRING(64),
        unique: true,
        set: function (val) {
            this.setDataValue('user', val.toLowerCase().trim());
        }
    },
    password: {
        type: DataTypes.STRING,
        set: function (val) {
           //Setters are synchronous http://stackoverflow.com/a/22006362/1767047
           var salt = bcryptSync.genSaltSync(ROUNDS);
           var hash = bcryptSync.hashSync(val, salt); 
           this.setDataValue('password', hash);
        }
    },
    email: {
        type:  DataTypes.STRING(255),
        set: function (val) {
            this.setDataValue('email', val.toLowerCase().trim());
        }
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
