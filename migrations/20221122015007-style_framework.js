'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('style_framework', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      url: {
        type: Sequelize.TEXT,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.BIGINT(30),
        allowNull: false,
        defaultValue: 0,
      },  
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }, 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
