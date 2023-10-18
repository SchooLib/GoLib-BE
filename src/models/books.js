"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.genres, {
        through: "bookGenres",
        foreignKey: "bookId",
      });
    }
  }
  books.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      publisher: DataTypes.STRING,
      year: DataTypes.STRING,
      clasification: DataTypes.STRING,
      review_keys: DataTypes.ARRAY(DataTypes.STRING),
      review_point: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "books",
      timestamps: true
    }
  );
  return books;
};
