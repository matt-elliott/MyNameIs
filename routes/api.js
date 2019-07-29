module.exports = function (app) {
  app.post('/api/addUser', function (req, res) {
    //use sequelize to send data to be added to user table in db
  });
  app.get('/api/users', function (req, res) {
    //return all users for event
  });
  app.post('/api/addEvent', function (req, res) {
    //adds event and attaches admin user to it
  });
  app.get('/api/events', function (req, res) {
    //returns all evnets
  });
}