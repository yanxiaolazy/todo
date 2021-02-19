const createHash = require('../../../utils/createHash');
const { UsersTable } = require('../../../config/db');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const username = 'admin',
         results = await UsersTable.findAll({where: {username}})

   if (results.length === 0) {
    return await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username,
        password: createHash('admin'),
        email: 'admin@admin.admin',
        createTime: new Date(),
        updateTime: new Date(),
        admin: true
      }
    ]);
   } else {
     console.log('seeder already exists');
   }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return await queryInterface.bulkDelete('users', null, {});
  }
};
