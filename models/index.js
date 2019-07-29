const Sequelize = require('sequelize');
//TODO make this envirmentment agnostic (check activity 10: sequlize-validations for example)
const sequelize = new Sequelize(
  {
    database: process.env.DB,
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);

//require each model and place them into an object here
const events = require('./events')(sequelize, Sequelize);
const users = require('./users')(sequelize, Sequelize);

const db = {
  sequelize,
  events,
  users
}

module.exports = db;