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
