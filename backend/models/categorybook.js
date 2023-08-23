"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryBook.belongsTo(models.Book);
      CategoryBook.belongsTo(models.Category);
    }
  }
  CategoryBook.init(
    {
      BookId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CategoryBook",
    }
  );
  return CategoryBook;
};
