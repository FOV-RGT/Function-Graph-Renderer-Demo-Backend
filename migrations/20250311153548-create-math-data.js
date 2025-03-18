'use strict';
const { Sequelize, DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mathData', {
         id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER.UNSIGNED
            },
            uploadId: {
              type: DataTypes.INTEGER.UNSIGNED,
              references: {
                model: 'uploads', //关联表
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            },
            dimension: {
              type: DataTypes.TINYINT
            },
            fn: {
              type: DataTypes.STRING
            },
            color: {
              type: DataTypes.STRING
            },
            nSamples: {
              type: DataTypes.INTEGER.UNSIGNED
            },
            visible: {
              type: DataTypes.BOOLEAN
            },
            graphType: {
              type: DataTypes.STRING
            },
            closed: {
              type: DataTypes.BOOLEAN
            },
            createdAt: {
              allowNull: false,
              type: DataTypes.DATE
            },
            updatedAt: {
              allowNull: false,
              type: DataTypes.DATE
            }
          });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mathData');
  }
};