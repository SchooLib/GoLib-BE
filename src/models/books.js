"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    static associate(models) {
      this.belongsToMany(models.classifications, {
        through: "bookClassifications",
      });
      this.hasMany(models.bookReviews, {
        foreignKey: 'bookId',
        as: 'reviews' // this is an alias for the association
      });
    }
  }
  books.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      publisher: DataTypes.STRING,
      year: DataTypes.STRING,
      review_keys: DataTypes.ARRAY(DataTypes.STRING),
      review_point: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "books",
      timestamps: true,
    }
  );
  return books;
};
