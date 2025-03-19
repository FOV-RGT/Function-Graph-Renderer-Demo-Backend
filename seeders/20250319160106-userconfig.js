'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
   await queryInterface.bulkInsert('userconfigs', [{
    userId: 1,
    chartType: 'linear',
    closed: false,
    range: null,
    dash: false,
    grid: true,
    zoomFactor: 0.5,
    moveFactor: 0.2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    chartType: 'linear',
    closed: false,
    range: null,
    dash: false,
    grid: true,
    zoomFactor: 0.5,
    moveFactor: 0.2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    chartType: 'linear',
    closed: false,
    range: null,
    dash: false,
    grid: true,
    zoomFactor: 0.5,
    moveFactor: 0.2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    chartType: 'linear',
    closed: false,
    range: null,
    dash: false,
    grid: true,
    zoomFactor: 0.5,
    moveFactor: 0.2,
    createdAt: new Date(),
    updatedAt: new Date()
  }  ], {});
},
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userconfigs', null, {});
  }
};
