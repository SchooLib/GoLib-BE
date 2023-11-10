"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class userAchievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userAchievements.belongsTo(models.User, { foreignKey: "userId" });
      userAchievements.belongsTo(models.Achievement, {
        foreignKey: "achievementId",
      });
    }
  }

  userAchievements.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      achievementId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userAchievements",
      timestamps: true,
    }
  );
  return userAchievements;
};
