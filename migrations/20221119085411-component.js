'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('component', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      section_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_path: {
        type: Sequelize.STRING,
        allowNull: false,
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
