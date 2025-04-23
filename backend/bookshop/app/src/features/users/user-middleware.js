const { requestTypes } = require('./user-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')

const validateJoin = (req, res, next) => {
  return validateSchema(requestTypes.join)(req, res, next)
}

const validateEmail = (req, res, next) => {
  console.log('validateEmail')
  console.log(req.body)
  return validateSchema(requestTypes.validateEmail)(req, res, next)
}

module.exports = { validateJoin, validateEmail }
