require('dotenv').config();
const config = {
 development: {
   database: process.env.DB,
   host: process.env.HOST,
   username: process.env.DB_USER,
   password: process.env.PASSWORD,
   port: process.env.DB_PORT,
   dialect: 'mysql'
 },
 test: {
   database: 'test',
   host: 'testhost',
   username: 'testroot',
   password: '',
   port: 3306,
   dialect: 'mysql'
 },
 production: {
   database: 'prody',
   host: 'prodyhost',
   username: 'prodyroot',
   password: '',
   port: 3306,
   dialect: 'mysql'
 }
}
module.exports = config;