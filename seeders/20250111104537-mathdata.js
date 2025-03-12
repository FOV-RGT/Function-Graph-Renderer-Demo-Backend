'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mathData', [
        { 
          uploadId: 1,
          dimension: 2,
          fn: '2sin(2x)', 
          color: 'rgb(24, 126, 170)',
          nSamples: 2025,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        { 
          uploadId: 2,
          dimension: 2,
          fn: '3cos(log(x^10))',
          color: 'rgba(218, 194, 73, 0.5)',
          nSamples: 2025,
          visible: true ,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          u: 3,
          dimension: 3,
          fn: '8log(cos(sin(sqrt(x^3))))',
          color: 'rgb(126, 40, 128)',
          nSamples: 2025,
          visible: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        { 
          userId: 1,
          dimension: 2,
          fn: '5',
          color: 'rgb(22, 73, 162)',
          nSamples: 2025,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        { 
          userId: 2,
          dimension: 2,
          fn: '-5',
          color: 'rgb(78, 105, 188)',
          nSamples: 2025,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date() 
        }  
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mathData', null, {});
  }
};
