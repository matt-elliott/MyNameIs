module.exports = function (app, db) {
  const Op = db.Sequelize.Op;

  app.get('/', function (req, res) {
    res.render('index');
  });
  app.get('/register/:eventID?', function ({ params }, res) {
    console.log(params);
    res.render('register');
  });
  app.get('/admin/addevent', async function (req, res) {
    res.render('add-event')
  });
  app.get('/admin/invite/:eventID', function (req, res) {
    res.render('invite');
  });
  app.get('/admin/', function (req, res) {
    res.render('admin');
  });
  app.get('/admin/addusers', function (req, res) {
    res.render('add-users');
  });
  app.get('/event/:eventID',
  async function ({params: {eventID} }, res) {
    try {
      //TODO USE JOIN TABLES TO GET A MORE COMPLETE DATA SET
      let data = {};
      data.events = await db.Events.findByPk(eventID);
      data.pending_invites = await db.Invites.findAll(
        {
          where: {
            eventID: eventID,
            status: {
             [Op.or]:  ['pending', 'sent']
            }
          }
        }
      );
      data.accepted_invites = await db.Invites.findAll(
        {
          where: {
            eventID: eventID,
            status: 'accepted'
          }
        }
      );
      
      res.render('event-page', data);  
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
    
  });
  app.get('/event/:eventID/attendees', function (rq, res) {
    res.render('attendees');
  });
  app.get('/user/:userID/', function (req, res) {
    res.render('profile');
  })
}