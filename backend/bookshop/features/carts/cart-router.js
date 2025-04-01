const express = require('express')
const router = express.Router()
const {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteFromCart,
} = require('./cart-controller')

router
  .route('/:userId')
  .get(getCartItems)
  .post(addToCart)
  .put(updateCartItem)
  .delete(deleteFromCart)

module.exports = router
