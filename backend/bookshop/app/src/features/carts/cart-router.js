const express = require('express')
const router = express.Router()
const {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteFromCart,
} = require('./cart-controller')

const { validateAccessToken } = require('../auth/auth-middleware')

router
  .route('/')
  .get(validateAccessToken, getCartItems)
  .post(validateAccessToken, validateAccessToken, addToCart)
  .put(validateAccessToken, updateCartItem)

router.route('/:productId').delete(validateAccessToken, deleteFromCart)

module.exports = router
