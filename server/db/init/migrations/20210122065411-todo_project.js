'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('todo_project', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      projectTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      createTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updateTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull:false
      },
      value: {
        type: Sequelize.DataTypes.TEXT
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'Pending',//Completed Processing
        allowNull:false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('todo_project');
  }
};
