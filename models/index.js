const Sequelizer = require('sequelize');
console.log(process.env.USERNAME);
const sequelize = new Sequelizer(
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
const events = require('./events')(sequelize);
const users = require('./users')(sequelize);

const db = {
  sequelize,
  events,
  users
}

module.exports = db;