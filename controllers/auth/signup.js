const jwt = require('jsonwebtoken');

const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');
const userSubsEnum = require('../../constants/userSubsEnum');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

exports.signup = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
    subscription: userSubsEnum.DEFAULT,
  };
  console.log(newUserData);

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});