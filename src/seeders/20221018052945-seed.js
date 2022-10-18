"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "Test",
        username: "test",
        email: "test@mail.com",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Test1",
        username: "test1",
        email: "test1@mail.com",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    let trips = [
      {
        place: "Tarapoto",
        startDate: new Date("2022-12-31"),
        endDate: new Date("2023-01-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        place: "Cuzco",
        startDate: new Date("2023-02-12"),
        endDate: new Date("2023-02-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // const userIds = await queryInterface.bulkInsert("Users", users, {
    //   returning: ["id"],
    // });
    await queryInterface.bulkInsert("Users", users, {});

    const userIds = await queryInterface.sequelize.query(
      `SELECT id from USERS;`
    );

    const userIdValues = userIds[0];
    await queryInterface.bulkInsert(
      "Trips",
      trips.map((data) => {
        return {
          ...data,
          UserId: userIdValues[Math.floor(Math.random() * userIdValues.length)].id || 1,
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Trips", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
