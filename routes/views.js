module.exports = function (app, db) {
  app.get('/', function (req, res) {
    res.render('index');
  });
  app.get('/register', function (req, res) {
    res.render('register');
  });
  app.post('/api/register',
    async function ({ body }, res) {
    try {
      let result = await db.Users.create(body);
      console.log('sent:\n', result.dataValues)
      res.sendStatus(200);  
    } catch (error) {
      console.log(error);
    }
  });
  app.get('/invite', function (req, res) {
    res.render('invite');
  });
  app.get('/admin/', function (req, res) {
    res.render('admin');
  });
  app.get('/admin/addusers', function (req, res) {
    res.render('add-users');
  });
  app.get('/event/:eventID', function (req, res) {
    res.render('event-page');
  });
  app.get('/event/:eventID/attendees', function (rq, res) {
    res.render('attendees');
  });
  app.get('/user/:userID/', function (req, res) {
    res.render('profile');
  })
}