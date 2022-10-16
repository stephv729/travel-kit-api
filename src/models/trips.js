module.exports = (sequelize, DataType) => {
  const Trips = sequelize.define("Trips", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    place: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        noEmpty: true,
      },
    },
    start_date: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    end_date: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterThanStartDate(value) {
          const startDate = new Date(this.start_date);
          const endDate = new Date(value);
          if (startDate <= endDate) {
            throw new Error("End date must be after start date");
          }
        },
      },
    },
  });
  Trips.associate = (models) => {
    Trips.belongsTo(models.Users)
  };
  return Trips
};
