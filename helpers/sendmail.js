const mailer = require('nodemailer');
const db = require('../models');

async function sendMail() {
  console.log('sending email');
  //first get list of email address that have a sent status sending
  let emails = await getNewInvites();
  let addresses = [];
  let inviteURL = emails[0].email;

  //use nodemailer to send email to each address, handling if only one address is inputted
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
  

  //loop through emails object and send email to each invitee
  emails.forEach(async function (item) {
    addresses.push(item.email.trim());
  });
  
    // console.log(email.email.trim());
    let mailOptions = {
      from: 'c7d78e59ef-ca5730@inbox.mailtrap.io',
      to: addresses.join(', '),
      subject: 'You Are Invited to Attend A Private Event Through My Name Is',
      test: 'Hello World!',
      html: `You are invited to attend an event and use the My Name Is app to keep track of people's names.<br/><br/>Follow the invite link to accept the invite!<br/><br/><a href="${inviteURL}">Accpet Invite</a>`
    };

    console.log('sending');
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('error : ', error);
      } else {
        console.log('sent email: ', info);
      }
    });      
  // });
  

  //set invite status to send
}

async function getNewInvites() {
  let emails = [];
  let res = await db.Invites.findAll({
    where:
    {
      status: 'sending'
    }
  });

  res.forEach(function (item) {
    emails.push({
      email: item.email.trim(),
      eventID: item.eventID,
      inviteURL: `http://localhost:8080/register/${item.eventID}`
    });
  });

  return emails;
}

module.exports = sendMail;