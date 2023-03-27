const { catchAsync } = require('../../utils');
const User = require('../../models/userModel');


exports.logout = catchAsync(async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  });