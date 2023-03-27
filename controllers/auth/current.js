const { catchAsync } = require('../../utils');

exports.current = catchAsync(async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
  });