const signup = require("./signup");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
  signup,
  login,
  current,
  logout,
  verifyEmail,
  resendVerifyEmail,
};