"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  tickets.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      publisher: DataTypes.STRING,
      year: DataTypes.STRING,
      clasification: DataTypes.STRING,
      booksGenres : DataTypes.ARRAY(DataTypes.STRING),
      review_keys: DataTypes.ARRAY(DataTypes.STRING),
      review_point: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return bookss;
};
