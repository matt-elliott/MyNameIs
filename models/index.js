const config = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config[process.env.ENV]
);

const Events = require('./events')(sequelize, Sequelize);
const Users = require('./users')(sequelize, Sequelize);

const db = {
  sequelize,
  Events,
  Users
}

module.exports = db;