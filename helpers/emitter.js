const events = require('events');
const emitter = new events.EventEmitter();
const sendMail = require('./sendmail');

emitter.on('invites-table-updated', sendMail);
module.exports = emitter;