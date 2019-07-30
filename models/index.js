const config = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config[process.env.ENV]
);

const events = require('./events')(sequelize, Sequelize);const users = require('./users')(sequelize, Sequelize);

const db = {
  sequelize,
  events,
  users
}

module.exports = db;