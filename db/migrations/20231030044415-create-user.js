'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      },
      nisn: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      role: {
        type: Sequelize.STRING,
        allowNull:false
      },
      point: {
        type: Sequelize.INTEGER
      },
      isPasswordChange: {
        type: Sequelize.BOOLEAN
      },
      img: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};