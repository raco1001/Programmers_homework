const express = require('express')
const router = express.Router()
const { getOrderItems, updateOrderItem } = require('./order-controller')
const { validateAccessToken } = require('../auth/auth-middleware')

router.route('/').put(validateAccessToken, updateOrderItem)

router.route('/order-items').get(validateAccessToken, getOrderItems)

module.exports = router
