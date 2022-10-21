"use strict";
module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          len: [5, 20],
        },
      },
      email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      token: {
        type: DataType.STRING,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate(models) {
          User.hasMany(models.Trip, {
            foreignKey: "UserId",
            as: "Trip",
          });
        },
      },
    }
  );
  return User;
};
