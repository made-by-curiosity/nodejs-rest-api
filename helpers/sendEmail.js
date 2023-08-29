const EMAIL_SENDER = 'qwerty@gmail.com';

const sendEmail = async data => {
  const email = { ...data, from: EMAIL_SENDER };

  console.log(email);
};

module.exports = sendEmail;

// ===========================================================
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const { META_PASSWORD } = process.env;

// /* порты 23 465 и 225 */

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'qwerty@mail.com',
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailer);

// const email = {
//   to: '',
//   from: '',
//   subject: '',
//   html: '',
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log('mail has been sent'))
//   .catch(e => console.log(e.message));
