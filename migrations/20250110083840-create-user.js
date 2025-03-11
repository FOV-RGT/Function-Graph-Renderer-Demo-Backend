'use strict';
const { Sequelize, DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      nickname: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0
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
    await queryInterface.addIndex(
      'Users', {
      fields: ['email'],
      unique: true
    });
    await queryInterface.addIndex(
      'Users', {
      fields: ['username'],
      unique: true
    });
    await queryInterface.addIndex(
      'Users', {
      fields: ['role']
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};