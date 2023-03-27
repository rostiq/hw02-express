const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const { catchAsync, userValidator, AppError } = require('../utils');

exports.checkSignupUserData = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.signupUserDataValidator(req.body);

  if (error) return next(new AppError(400, 'Помилка від Joi або іншої бібліотеки валідації'));

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

  if (!token) return next(new AppError(401, 'Not authorized'));

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(new AppError(401, 'Not authorized'));
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new AppError(401, 'Not authorized'));

  req.user = currentUser;

  next();
});
