import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

const basename = path.basename(__filename);
let db = null;
module.exports = (app) => {
  const config = app.libs.config["development"];
  if (!db) {
    const sequelize = new Sequelize(...Object.values(config));

    db = {
      sequelize,
      Sequelize,
      models: {},
    };

    // const dir = path.join(__dirname, "models");
    const dir = __dirname;
    fs.readdirSync(dir)
      .filter((filename) => {
        return (
          filename.indexOf(".") !== 0 &&
          filename !== basename &&
          filename.slice(-3) === ".js"
        );
      })
      .forEach((filename) => {
        const modelDir = path.join(dir, filename);
        const model = require(modelDir)(sequelize, Sequelize.DataTypes);
        // const model = sequelize.import(modelDir);
        db.models[model.name] = model;
      });

    Object.keys(db.models).forEach(function (modelName) {
      if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
      }
    });
  }

  return db;
};
