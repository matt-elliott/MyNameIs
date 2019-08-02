const Emitter = require('../helpers/emitter');
// const checkInviteeEmail = require('../helpers/checkemail');
const chalk = require('chalk');

module.exports = function (app, db) {

  app.post('/api/addUser', function (req, res) {
    //use sequelize to send data to be added to user table in db
  });
  app.get('/api/users', function (req, res) {
    //return all users for event
  });
  app.post('/api/addEvent', async function ({ body }, res) {
    try {
      let result = await db.Events.create(body);

      res.send({
        redirect: `/admin/invite/${result.dataValues.id}`
      });
    } catch (error) {
      console.log(cholk.bgRed.white.bold(error));
      res.sendStatus(500);
    }
  });
  app.get('/api/events', function (req, res) {
    //returns all evnets
  });
  app.post('/api/register/', async function ({ body }, res) {
      //todo make an else statement to handle whan eventID is greater than 0
      // if (parseInt(body.eventID) > 0)
      if (body.eventID || parseInt(body.eventID) >= 1) {
        console.log(chalk.bgBlue.white.bold('Invited User Sign Up'));
        
        try {
          let invites = await db.Invites.findAll({
            where: {
              eventID: body.eventID
            }
          });

          let invitesLength = invites.length;
          let i = 0;

          for (i; i < invitesLength; i++) {

            if (invites[i].email === body.email) {
              let id = invites[i].id;
              let updated = await db.Invites.update({
                status: 'accepted',
              }, {
                  where: {
                    id: id
                  }
                }
              );
              
              let result = await db.Users.create(body);
              console.log(chalk.bgGreen.white.bold('Invited User Sign Up Completed'));
              //user is admin and will create event
              res.send({ redirect: `/event/${result.eventID}` });
            } else {
              console.log(chalk.bgRed.white('You`re not invited!'));
            };
            //todo hand dupes better ^^^
          }
        } catch (error) {
          console.log(chalk.bgRed.white.bold('\n', error, '\n'));
        }
      } else {
        console.log(chalk.bgBlue.white.bold('Creating Admin User.'));
        if (body.eventID === '') body.eventID = 0;
      
        try {
          let result = await db.Users.create(body);
          console.log(chalk.bgGreen.white.bold('Admin User Created.')); 
          res.send({ redirect: '/admin/addevent' });
          
        } catch (error) {
          console.log(chalk.bgRed.white(error));
        }
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

      Emitter.emit('invites-table-updated');
      res.send({ redirect: `/event/${eventID}` });
    } catch (error) {
      console.log(chalk.bgRed.white.bold(error));
      res.sendStatus(500);
    }

    //TODO have node listen to updates in invite list and send invites to new people?
    //TODO 
  });

  app.post('/api/login/', async function ({body}, res) {
    let results = await db.Users.findAll({
      where: {
        username: body.username,
        password: body.password
      }
    });
    
    console.log(results);
    //then login with results
    
    res.sendStatus(200);
  })
}