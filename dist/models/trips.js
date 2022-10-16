"use strict";

module.exports = function (sequelize, DataType) {
  var Trips = sequelize.define("Trips", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    place: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        noEmpty: true
      }
    },
    start_date: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    end_date: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterThanStartDate: function isAfterThanStartDate(value) {
          var startDate = new Date(this.start_date);
          var endDate = new Date(value);
          if (startDate <= endDate) {
            throw new Error("End date must be after start date");
          }
        }
      }
    }
  });
  Trips.associate = function (models) {
    Trips.belongsTo(models.Users);
  };
  return Trips;
};