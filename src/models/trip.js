'use strict';
module.exports = (sequelize, DataType) => {
  const Trip = sequelize.define("Trip", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId:{
      type: DataType.INTEGER,
      allowNull: false,
    },
    place: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startDate: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    endDate: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterThanStartDate(value) {
          const startDate = new Date(this.startDate);
          const endDate = new Date(value);
          if (startDate >= endDate) {
            throw new Error("End date must be after start date");
          }
        },
      },
    },
  },{
    classMethods: {
      associate(models) {
        Trip.belongsTo(models.Users)
      },
    },
  });
  return Trip
};
