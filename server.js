require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const config = require('./config/config');

const hbs = require('express-handlebars');
const apiRoutes = require('./routes/api');
const viewsRoutes = require('./routes/views');
const db = require('./models');
console.log(chalk.bgGreen.white.bold(process.env.NODE_ENV));
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(
  '/assets/',
  express.static(__dirname + '/public/')
);

apiRoutes(app, db);
viewsRoutes(app, db);

//{force: true}
db.sequelize.sync({force: true}).then(function () {
  app.listen(port, function () {
    console.log('App Live On Port: ', port);
    console.log(chalk.bgGreen.white.bold('\n\nVVVVVVVVV\n\n'));
  });
});