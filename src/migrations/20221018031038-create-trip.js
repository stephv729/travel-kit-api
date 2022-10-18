"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        type: Sequelize.DATE,
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
      UserId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Trips");
  },
};
