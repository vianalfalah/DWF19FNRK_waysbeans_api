"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Transaction, {
        as: "transactions",
        foreignKey: "userID",
      });
      User.hasOne(models.Profile, {
        as: "profile",
        foreignKey: "userID",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true, //Paranoid Model to active soft delete
      modelName: "User",
    }
  );
  return User;
};
