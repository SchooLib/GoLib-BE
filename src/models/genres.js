"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  genres.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "genres",
      timestamps: true,
    }
  );
  return genres;
};
