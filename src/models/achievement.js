"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // this.hasMany(models.userAchievement, { foreignKey: "achievementId" });
    }
  }

  Achievement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      achive_point: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxRead: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readGenre: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Achievement",
      timestamps: true,
    }
  );
  return Achievement;
};
