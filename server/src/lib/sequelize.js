/*
# One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
*/

const { Sequelize } = require("sequelize");
const setupModels = require("../models/index");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect:
      "mssql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    dialectOptions: {
      options: {
        // Your tedious options here
        encrypt: false,
      },
    },
  }
);

const sequelize120 = new Sequelize(
  process.env.DB_NAME120,
  process.env.DB_USER120,
  process.env.DB_PASSWORD120,
  {
    host: process.env.DB_SERVER120,
    dialect:
      "mssql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    dialectOptions: {
      options: {
        // Your tedious options here
        encrypt: false,
        requestTimeout: 120000 // tiempo de espera de la consulta en milisegundos 1min 60000ms
      },
    },
  }
);

setupModels(sequelize);
//sequelize.sync();

module.exports = {sequelize, sequelize120};
