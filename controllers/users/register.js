const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const sendEmail = require('../../helpers/sendEmail');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  const { email: userEmail, subscription } = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: userEmail,
    subject: 'Email verification',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">
        Email verification link. Click on it to finish registration.
      </a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email: userEmail,
        subscription,
      },
    },
  });
};

module.exports = register;
