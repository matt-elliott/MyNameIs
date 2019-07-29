require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const Sequelizer = require('sequelizer');
const sequelize = new Sequelizer(process.env.HOST);
const hbs = require('express-handlebars');

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use('assets/', express.static("public"));

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(port, function () {
  console.log('App Live On Port: ', port);
})