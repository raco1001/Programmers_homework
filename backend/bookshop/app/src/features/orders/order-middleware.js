const { createOrder, updateOrder, getOrder } = require('./order-dto')
const validateSchema = require('../../shared/middlewares/validateSchema')

const validateOrder = () => {
  return validateSchema(createOrder)
}

const validateGetOrder = () => {
  return validateSchema(getOrder)
}

module.exports = { validateOrder, validateGetOrder }
