"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
      Transaction.belongsToMany(models.Product, {
        as: "products",
        //through = melewati
        through: {
          model: "TransToProd",
        },
        foreignKey: "transID",
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      pos: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
