// const dotenv = require("dotenv").config();

const {
  DEV_DB_USERNAME,
  DEV_DB_NAME,
  DEV_DB_PASSWORD,
  PROD_DB_USERNAME,
  PROD_DB_NAME,
  PROD_DB_PASSWORD,
} = process.env;

const config = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    logging: false,
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    logging: false,
  },
};

export default config;
// module.exports = config;
