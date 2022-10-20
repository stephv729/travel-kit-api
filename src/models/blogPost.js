// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Review extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Review.init({
//     title: DataTypes.STRING,
//     body: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Review',
//   });
//   return Review;
// };


'use strict';
module.exports = (sequelize, DataType) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TripId:{
      type: DataType.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photoUrl: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },{
    classMethods: {
      associate(models) {
        BlogPost.belongsTo(models.Trips)
      },
    },
  });
  return BlogPost
};