module.exports = function (app, db) {
  app.post('/api/addUser', function (req, res) {
    //use sequelize to send data to be added to user table in db
  });
  app.get('/api/users', function (req, res) {
    //return all users for event
  });
  app.post('/api/addEvent', async function ({body}, res) {
    try {
      let result = await db.Events.create(body);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  });
  app.get('/api/events', function (req, res) {
    //returns all evnets
  });
  app.post('/api/register',
    async function ({ body }, res) {
    try {
      let result = await db.Users.create(body);
      res.sendStatus(200);  
    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  });
}