'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('mathData', [
      {
        userId:1,
        dimension:2,
        functionValue: 'x^2+y^2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId:1,
        dimension:2,
        functionValue: 'x^2+y^2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId:2,
        dimension:3,
        functionValue: 'x^2+y^2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId:2,
        dimension:3,
        functionValue: 'x^2+y^2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mathdata', null, {});
  }
};
