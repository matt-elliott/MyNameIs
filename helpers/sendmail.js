const mailer = require('nodemailer');
const db = require('../models');
const Op = db.Sequelize.Op;

async function sendMail() {
  console.log('sending email');
  let [emails, ids, eventID] = await getNewInvites();

  let transporter;
  try {
    transporter = await mailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '6d266ebae0c53f',
        pass: '70cf9f2f15aaf8',
      }
    });
  } catch (error) {
    console.log(error);
  }
  
  let mailOptions = {
    from: 'c7d78e59ef-ca5730@inbox.mailtrap.io',
    to: emails.join(', '),
    subject: 'You Are Invited to Attend A Private Event Through My Name Is',
    test: 'Hello World!',
    html: `You are invited to attend an event and use the My Name Is app to keep track of people's names.<br/><br/>Follow the invite link to accept the invite!<br/><br/><a href="${process.env.ENV_URL}/api/register/${eventID}">Accpet Invite</a>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error : ', error);
    } else {
      console.log('sent email: ', info);
    }
  });
  //set invite status to send
  updateNewInvitesStatus(ids);
}

async function getNewInvites() {
  let emails = [];
  let ids = [];
  let res = await db.Invites.findAll({
    where:
    {
      status: 'sending'
    }
  });
  let eventID = res[0].eventID;

  res.forEach(function (item) {
    emails.push(item.email.trim());
    ids.push(item.id);
  });

  return [emails, ids, eventID];
}

async function updateNewInvitesStatus(ids) {  
  let minID = Math.min(...ids);
  let maxID = Math.max(...ids);

  try {
    let results = await db.Invites.update({
      status: 'pending'
    },
    {
      where: {
        id: { [Op.between]: [minID, maxID] }
      }
    });
    console.log(results);  
  } catch (error) {
    console.log('error : ', error);
  }
  

}

module.exports = sendMail;