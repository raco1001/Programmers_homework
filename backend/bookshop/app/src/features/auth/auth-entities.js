const Joi = require('joi')

const requestTypes = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
  refresh: Joi.object({
    refreshToken: Joi.string().required(),
  }),
}

const responseTypes = {
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
