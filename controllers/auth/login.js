const User = require('../../models/userModel');

const { catchAsync, AppError } = require("../../utils");
const { signToken } = require("./token");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.verify) return next(new AppError(401, "Not authorized"));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) return next(new AppError(401, "Not authorized"));

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});
