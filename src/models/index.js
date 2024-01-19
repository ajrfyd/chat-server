import Sequelize from "sequelize";
import config from "../config/config.js";
import Room from "./Room.js";

const { NODE_ENV } = process.env;

const db = {};

const sequelize = new Sequelize(
  config[NODE_ENV].database,
  config[NODE_ENV].username,
  config[NODE_ENV].password,
  config[NODE_ENV]  
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Room = Room(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


export default db;