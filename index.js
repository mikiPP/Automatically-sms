const cron = require('node-cron');
const config = require('./config');

const accountSid = config.SID;
const authToken = config.TOKEN;

const client = require('twilio')(accountSid, authToken); // this is to send messages from twilio
const messages = require('./messages'); // here we save the messages that we want to send

let currentMessage = 0;

function sendMessage() {
  client.messages
    .create({
      body: messages[currentMessage],
      from: '+12063126477',
      to: config.HER_PHONE_NUMBER,
    })
    .then(message => {
      currentMessage += 1;
      console.log(message.sid);
    })
    .catch(error => {
      console.log(error);
    });
}

// this function sends one messages every hour at 10 ex: 18:10,19:10
cron.schedule('10 * * * *', () => {
  sendMessage();
});

/**
 *  To reply this u can check the code from here (https://www.freecodecamp.org/news/send-a-romantic-message-every-hour-to-your-valentine/)
 *  or clone my project and set up the config.js and messages.js
 *
 */
