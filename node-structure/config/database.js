const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "your_database_name",
  "your_username",
  "your_password",
  {
    host: "your_host_name",
    dialect: "mysql",
  }
);

module.exports = sequelize;
