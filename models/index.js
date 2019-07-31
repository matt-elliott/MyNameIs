
const config = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config[process.env.ENV]
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