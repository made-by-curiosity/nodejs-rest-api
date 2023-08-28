const { BadRequest, NotFound } = require('http-errors');
const { User } = require('../../models/user');
const sendEmail = require('../../helpers/sendEmail');

const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User not found');
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">
        Email verification link. Click on it to finish registration.
      </a>`,
  };

  await sendEmail(mail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerificationEmail;
