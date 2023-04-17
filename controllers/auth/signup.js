const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');
const userSubsEnum = require('../../constants/userSubsEnum');
const {sendEmail} = require('../../utils');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

exports.signup = catchAsync(async (req, res) => {
const { email, password, firstName, lastName } = req.body;
const subscription = userSubsEnum.DEFAULT;

const verificationToken = uuidv4();
const avatarURL = gravatar.url(email, {
s: '250',
r: 'pg',
d: 'mm',
});

const newUser = await User.create({
email,
password,
firstName,
lastName,
subscription,
avatarURL,
verificationToken,
});

  newUser.password = undefined;

  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}' target='_blank'>Натисніть для пітдвердження регістрації'</a>`,
  };

  await sendEmail(mail);

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});