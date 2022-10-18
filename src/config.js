// const config = {
//   development: {
//     username: "",
//     password: "",
//     database: "travel_kit_db_development",
//     params: {
//       host: "localhost",
//       dialect: "sqlite",
//       storage: "travel-kit-db.sqlite3",
//       define: {
//         underscore: true,
//       },
//       operatorsAliases: 0,
//     },
//   },
//   test: {
//     username: "",
//     password: "",
//     database: "travel_kit_db_test",
//     host: "127.0.0.1",
//     dialect: "sqlite",
//   },
//   production: {
//     username: "",
//     password: "",
//     database: "travel_kit_db_production",
//     host: "127.0.0.1",
//     dialect: "sqlite",
//   },
// };

// module.exports = config;

// module.exports = {
//   database: "travel-kit-db",
//   username: "",
//   password: "",
//   params: {
//     dialect: "sqlite",
//     storage: "travel-kit-db.sqlite",
//     define: {
//       underscore: true,
//     },
//     operatorsAliases: 0,
//   },
// };

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./travel-kit-db.sqlite3",
    define: {
      underscore: true,
    },
    operatorsAliases: 0,
  },
  test: {
    dialect: "sqlite",
    storage: ":memory",
  },
  production: {
    dialect: "sqlite",
    storage: "./travel-kit-db.sqlite3",
  },
};
