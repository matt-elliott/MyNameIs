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
      res.send({
        redirect: `/admin/invite/${result.dataValues.id}`
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  app.get('/api/events', function (req, res) {
    //returns all evnets
  });
  app.post('/api/register', async function ({ body }, res) {
    try {
      let result = await db.Users.create(body);
      res.sendStatus(200);  
    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  });

  app.post('/api/addInvite/:eventID', async function ({ body, params }, res) {
    let data = [];
    
    body.data.forEach(function (item) {
      let datum = {
        eventID: params.eventID,
        email: item,
      };

      data.push(datum);
    });

    try {
      let results = await db.Invites.bulkCreate(data);  
      let eventID = results[0].eventID;

      res.send({redirect: `/event/${eventID}`});
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
    
    //TODO have node listen to updates in invite list and send invites to new people?
    //TODO 
  });
}