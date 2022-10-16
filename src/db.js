import Sequelize from "sequelize";
let db = null;
module.exports = (app) => {
  const config = app.libs.config;
  if (!db) {
    const sequelize = new Sequelize(...Object.values(config));
  }
  return db;
};
