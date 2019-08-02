const config = require('../config/config');
const Sequelize = require('sequelize');

console.log(  config[process.env.NODE_ENV])
console.log(process.env.PASSWORD)
const sequelize = new Sequelize(
  config[process.env.NODE_ENV]
);

const Events = require('./events')(sequelize, Sequelize);
const Users = require('./users')(sequelize, Sequelize);
const Invites = require('./invite')(sequelize, Sequelize);

const db = {
  Sequelize,
  sequelize,
  Events,
  Users,
  Invites
}

module.exports = db;