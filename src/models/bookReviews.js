"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookReviews extends Model {
    static associate(models) {
      this.belongsTo(models.books, {
        foreignKey: 'bookId',
        as: 'book' // this is an alias for the association
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user' // this is an alias for the association
      });
    }
  }
  bookReviews.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      bookId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "bookReviews",
      timestamps: true,
    }
  );
  return bookReviews;
};
