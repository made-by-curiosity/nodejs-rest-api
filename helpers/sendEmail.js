const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

require('dotenv').config();
const { MAILGUN_KEY } = process.env;

const mg = mailgun.client({
  username: 'api',
  key: MAILGUN_KEY,
});

const EMAIL_SENDER =
  'Mailgun Sandbox <postmaster@sandbox77c0a957f6754edd82fc94e55a321743.mailgun.org>';

const sendEmail = async data => {
  const { to, subject, html } = data;

  mg.messages
    .create('sandbox77c0a957f6754edd82fc94e55a321743.mailgun.org', {
      from: EMAIL_SENDER,
      to,
      subject,
      html,
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
};

module.exports = sendEmail;
