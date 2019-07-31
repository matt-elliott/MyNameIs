const mailer = require('nodemailer');
const db = require('../models');

async function sendMail() {
  console.log('sending email');
  //first get list of email address that have a sent status sending
  let emails = await getNewInvites();

  console.log(emails);
  
  //use nodemailer to send email to each address, handling if only one address is inputted
  
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
    emails.push(item.email.trim());
  });

  return emails;
}

module.exports = sendMail;