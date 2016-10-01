'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    var sqlFK = `
      ALTER TABLE "Languages" 
      ADD CONSTRAINT languages_id_user 
      FOREIGN KEY (id_user) 
      REFERENCES "Users"
      ON UPDATE CASCADE
      ON DELETE CASCADE;
    `
      return [
          queryInterface.addColumn("Languages",'id_user',{
              type: Sequelize.INTEGER
          }),
          queryInterface.sequelize.query(sqlFK)];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    var sqlFK = `
      ALTER TABLE "Languages"
      DROP CONSTRAINT languages_id_user
    `;
      return [
          queryInterface.sequelize.query(sqlFK),
          queryInterface.removeColumn("Languages", "id_user")
      ];
  }
};
