const Joi = require('joi');


exports.createUserDataValidator = (data) => Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .validate(data);

exports.updateUserDataValidator = (data) => Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().email(),
  })
  .validate(data);

exports.signupUserDataValidator = (data) => Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .validate(data);