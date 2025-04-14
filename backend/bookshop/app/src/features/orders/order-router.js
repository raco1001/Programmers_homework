const express = require('express')
const router = express.Router()
const {
  getOrderItems,
  updateOrderItem,
  createOrder,
} = require('./order-controller')
const { validateAccessToken } = require('../auth/auth-middleware')
const { validateOrder } = require('./order-middleware')
router
  .route('/')
  .post(validateAccessToken, validateOrder, createOrder)
  .put(validateAccessToken, validateOrder, updateOrderItem)

router.route('/history').get(validateAccessToken, getOrderItems)

module.exports = router
