const config = {
  development: {
    username: "",
    password: "",
    database: "travel_kit_db_development",
    params: {
      host: "localhost",
      dialect: "sqlite",
      storage: "travel-kit-db.sqlite3",
      define: {
        underscore: true,
      },
      operatorsAliases: 0,
    },
  },
  test: {
    username: "",
    password: "",
    database: "travel_kit_db_test",
    host: "127.0.0.1",
    dialect: "sqlite",
  },
  production: {
    username: "",
    password: "",
    database: "travel_kit_db_production",
    host: "127.0.0.1",
    dialect: "sqlite",
  },
};

module.exports = config;
