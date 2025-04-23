const Joi = require('joi')

const requestTypes = {
  join: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
  validateEmail: Joi.object({
    email: Joi.string().email().required(),
  }),
  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
}

const responseTypes = {
  join: Joi.object({
    status: Joi.string().required(),
    message: Joi.string().required(),
  }),
}

module.exports = {
  requestTypes,
  responseTypes,
}
