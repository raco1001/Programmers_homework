const { requestTypes } = require('./user-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')

const validateJoin = () => {
  return validateSchema(requestTypes.join)
}

module.exports = { validateJoin }
