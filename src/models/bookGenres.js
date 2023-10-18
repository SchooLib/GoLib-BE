// Define the BookGenres model for the many-to-many relationship
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class bookGenres extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }

  bookGenres.init(
    {
      bookId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "bookGenres",
      timestamps: false, // You can set timestamps as needed
    }
  );

  return bookGenres;
};
