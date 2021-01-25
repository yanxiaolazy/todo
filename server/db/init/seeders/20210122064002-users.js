const createHash = require('../../../utils/createHash');

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

    return await queryInterface.bulkInsert('users', [
      {
        id: 0,
        username: 'rookie',
        password: createHash('admin'),
        email: 'rookie@heltec.cn',
        createTime: new Date(),
        updateTime: new Date(),
        admin: true
      }
    ])
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
