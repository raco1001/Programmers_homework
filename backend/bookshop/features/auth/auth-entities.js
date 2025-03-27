const Joi = require('joi')

const requestTypes = {
  join: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
  refresh: Joi.object({
    refreshToken: Joi.string().required(),
  }),
}

const responseTypes = {
  join: Joi.object({
    status: Joi.string().required(),
    message: Joi.string().required(),
  }),
  login: Joi.object({
    status: Joi.string().required(),
    accessToken: Joi.string().required(),
    user: Joi.object({
      userId: Joi.string().required(),
      userName: Joi.string().min(2).max(50).required(),
    }),
  }),
}

module.exports = {
  requestTypes,
  responseTypes,
}
