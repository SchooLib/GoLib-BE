"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      image: { type: Sequelize.STRING, allowNull: false },
      publisher: { type: Sequelize.STRING, allowNull: false },
      year: { type: Sequelize.STRING, allowNull: false },
      clasification: { type: Sequelize.STRING, allowNull: false },
      review_keys: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      review_point: { type: Sequelize.INTEGER, allowNull: false },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};
