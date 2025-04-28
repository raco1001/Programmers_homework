const joi = require('joi')

const createOrder = joi.object({
  items: joi
    .array()
    .items(
      joi.object({
        priceSum: joi.number().required(),
        productId: joi.string().required(),
        quantity: joi.number().required(),
      }),
    )
    .required(),
  totalQuantity: joi.number().required(),
  totalPrice: joi.number().required(),
  firstBookTitle: joi.string().required(),
  delivery: joi
    .object({
      address: joi.string().required(),
      zipCode: joi.string().required(),
      receiver: joi.string().required(),
      contact: joi.string().required(),
    })
    .required(),
})

const updateOrder = joi.object({
  productId: joi.string().required(),
  count: joi.number().required(),
})

const getOrder = joi.object({
  pageSize: joi.number().required(),
  pageNumber: joi.number().required(),
})

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
}
