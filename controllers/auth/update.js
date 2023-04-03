const User = require("../../models/userModel");
const { catchAsync } = require('../../utils');


exports.updateUser = catchAsync(async (userId, data) => {
    return await User.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
    });
  });

