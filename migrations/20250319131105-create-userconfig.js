'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userconfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      chartType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'linear'
      },
      closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      range: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      dash: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      grid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      zoomFactor: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.5
      },
      moveFactor: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.2
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userconfigs');
  }
};