const express = require('express')
const router = express.Router()
const { getOrderItems, initOrder, getOrders } = require('./order-controller')
const { validateAccessToken } = require('../auth/auth-middleware')
const { validateOrder } = require('./order-middleware')

router
  .route('/')
  .post(validateAccessToken, initOrder)
  .get(validateAccessToken, getOrders)

router.route('/:orderId').get(validateAccessToken, getOrderItems)

module.exports = router
