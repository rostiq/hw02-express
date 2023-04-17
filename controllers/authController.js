const jwt = require('jsonwebtoken');

const { catchAsync, AppError, sendEmail } = require('../utils');
const userSubsEnum = require('../constants/userSubsEnum');
const User = require('../models/userModel');

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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError(401, 'Not authorized'));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) return next(new AppError(401, 'Not authorized'));

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});


exports.logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
});

exports.current = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
});

exports.verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return next(new AppError(404, "User not found with verification token"));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

exports.resendVerifyEmail = async (req, res, next) => {
  console.log(req.body)
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  if (user.verify) {
    return next(new AppError(400, "User already verify"));
  }

  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href='http://localhost:3000/api/users/verify/${user.verificationToken}' target='_blank'>Натисніть для пітдвердження регістрації'</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Email verify resend",
  });
};