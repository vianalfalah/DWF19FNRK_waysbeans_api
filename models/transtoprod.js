"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransToProd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  TransToProd.init(
    {
      transID: DataTypes.INTEGER,
      prodID: DataTypes.INTEGER,
      orderQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransToProd",
    }
  );
  return TransToProd;
};
