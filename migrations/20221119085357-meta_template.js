'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('meta_template', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      meta_data_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      template_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
