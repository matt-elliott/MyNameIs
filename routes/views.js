const chalk = require('chalk');
const moment = require('moment')
module.exports = function (app, db) {
  const Op = db.Sequelize.Op;

  app.get(['/user/*', '/event/*', '/admin/*'], function({headers}, res, next) {
    
    if(
        headers.cookie &&
        headers.cookie.indexOf('userID') != -1
    ) {
      next();
    } else {
      res.redirect('/login/');
    }
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.get('/', function (req, res) {
    res.render('index');
  });
  app.get('/register/:eventID?/:emailaddress?', async function ({ params: {eventID, emailaddress} }, res) {
    if (eventID === undefined) eventID = 0;

    if (eventID > 0) {
      try {
        let data = await {};
        let eventsData = await db.Events.findByPk(eventID);
        let attendeesData = await db.Invites.findAll({
          where: {
            eventID: eventID,
            status: 'pending'
          }
        });

        data.eventID = eventID;
        data.events = eventsData.dataValues;
        data.attendees = attendeesData;
        if( emailaddress !== undefined) {
          data.emailAddress = emailaddress;
        }

        res.render('register', {data});
      } catch (error) {
        console.log(chalk.bgRed.white.bold(error));
      }
      
    } else {
      res.render('register');
    }
    
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
      let data = await {};
      data.events = await db.Events.findByPk(eventID);
     
      data.events = moment(start_time).format('h:mm a');
      data.events = moment(end_time).format('h:mm a');

      data.pending_invites = await db.Invites.findAll(
        {
          where: {
            eventID: eventID,
            status: {
             [Op.not]:  ['accepted']
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
      data.administrator = await db.Users.findOne({
        where: {
          id: data.events.adminID
        }
      });
      
      res.render('event-page', data);  
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
    
  });
  app.get('/event/:eventID/attendees', function (rq, res) {
    res.render('attendees');
  });
  app.get('/user/:userID/', async function ({params: {userID}}, res) {
    try {
      let [{dataValues}] = await db.Users.findAll({
        where: {
          id: userID
        }
      });
      
      let Events = await db.Events.findAll({
        where: {
          id: dataValues.eventID,
        }
      });

      let adminEvents = await db.Events.findAll({
        where: {
          adminID: dataValues.id,
        }
      });

      res.render('profile', {
          user: dataValues,
          events: Events,
          adminEvents: adminEvents
      });
    } catch(error) {
      console.log(error);
      res.render('login');
    }
  })
}