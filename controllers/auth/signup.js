const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');
const userSubsEnum = require('../../constants/userSubsEnum');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

exports.signup = catchAsync(async (req, res) => {
const { email, password, firstName, lastName } = req.body;
const subscription = userSubsEnum.DEFAULT;

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
});

  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});