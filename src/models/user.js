"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      nisn: DataTypes.STRING,
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "user" },
      point: DataTypes.INTEGER,
      isPasswordChange: { type: DataTypes.BOOLEAN, defaultValue: false },
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
