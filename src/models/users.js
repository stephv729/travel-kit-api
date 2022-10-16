module.exports = (sequelize, DataType) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        noEmpty: true,
      },
    },
    username: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        len: [5, 10],
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
  });
  Users.associate = (models) => {
    Users.hasMany(models.Trips);
  };

  return Users;
};
