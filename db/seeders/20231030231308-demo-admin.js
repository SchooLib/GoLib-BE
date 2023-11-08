'use strict';

const { Encription } = require('../../src/middleware/bicrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: "a7a4483f-5bda-416b-ba58-c68c6506983e",
      fullName: 'GenerasiGiGih',
      username: 'generasigigih',
      password: await Encription('gigih'),
      role:'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
