const config = require('../config/config');
const Sequelize = require('sequelize');
if(process.env.use_heroku_db) {
  const sequelize = new Sequelize(
    process.env.JAWSDB_URL
  );
} else {
  const sequelize = new Sequelize(
    config[process.env.NODE_ENV]
  );
}


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