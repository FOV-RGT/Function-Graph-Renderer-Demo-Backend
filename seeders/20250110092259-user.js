'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
        {
          email: 'kz.mail@qq.com',
          username: 'admin',
          password: bcrypt.hashSync('123123', 8),
          nickname: '超厉害的管理员',
          role: 100,
          avatarUrl: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user1@qq.com',
          username: 'user1',
          password: bcrypt.hashSync('123123', 8),
          nickname: '普通用户1',
          role: 0,
          avatarUrl: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user2@qq.com',
          username: 'user2',
          password: bcrypt.hashSync('123123', 8),
          nickname: '普通用户2',
          role: 0,
          avatarUrl: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user3@qq.com',
          username: 'user3',
          password: bcrypt.hashSync('123123', 8),
          nickname: '普通用户3',
          role: 0,
          avatarUrl: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
