const jwt = require('jsonwebtoken');

exports.signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

