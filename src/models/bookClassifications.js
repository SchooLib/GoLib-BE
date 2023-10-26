const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class bookClassifications extends Model {
    static associate(models) {
      
    }
  }

  bookClassifications.init(
    {
      bookId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      classificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "bookClassifications",
      timestamps: false,
    }
  );

  return bookClassifications;
};
