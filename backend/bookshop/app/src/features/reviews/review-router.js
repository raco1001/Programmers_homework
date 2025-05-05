const express = require('express')
const router = express.Router()
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('./review-controller')
const { validateAccessToken } = require('../auth/auth-middleware')

router.route('/').post(validateAccessToken, createReview)

router
  .route('/:productId')
  .get(getReviews)
  .put(validateAccessToken, updateReview)
  .delete(validateAccessToken, deleteReview)

module.exports = router
