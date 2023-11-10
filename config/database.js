const {
  dbUsername,
  dbPassword,
  dbDialect,
  dbHost,
  dbName,
} = require("./config");

module.exports = {
  development: {
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
  },
  production: {
    dialect: dbDialect,
    port: 50013,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: dbHost,
  },
};
