"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsToMany(models.Book, { through: models.CartBook });
      Cart.belongsTo(models.User);
    }
  }
  Cart.init(
    {
      UserId: DataTypes.INTEGER,
      totalPrice: DataTypes.FLOAT,
      cartDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
