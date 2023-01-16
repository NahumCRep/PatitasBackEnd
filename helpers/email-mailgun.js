const Mailgun = require('mailgun.js');
const formData = require('form-data');
const mailCongif = require('../config/mailgunConfig');

const sendEmail = (to_name, to_gmail) => {
    const {authCredentials, DOMAIN, mailOptions} = mailCongif;    
    const mailgun = new Mailgun(formData);

    // Setting mailgun client
    const client = mailgun.client({
        ...authCredentials
    });

    const messageData = {
        ...mailOptions(to_gmail, 'Patitas Registro'),
        text: 'Testing some Mailgun awesomeness!'
      };
      
    client.messages.create(DOMAIN, messageData)
       .then((res) => {
         console.log(res);
       })
       .catch((err) => {
         console.error(err);
       });
}

module.exports = {
    sendEmail
}