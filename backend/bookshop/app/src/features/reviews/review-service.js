const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('./review-repository')

const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

const createReviewService = async (userId, productId, rating, review) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const createdReview = await createReview(userBid, productBid, rating, review)
  return createdReview
}

const getReviewsService = async (productId, limit, page, sortBy, sortOrder) => {
  const productBid = uuidToBinary(productId)
  const reviews = await getReviews(productBid, limit, page, sortBy, sortOrder)
  return reviews
}

const updateReviewService = async (userId, productId, rating, review) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const updatedReview = await updateReview(userBid, productBid, rating, review)
  return updatedReview
}

const deleteReviewService = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const deletedReview = await deleteReview(userBid, productBid)
  return deletedReview
}

module.exports = {
  createReviewService,
  getReviewsService,
  updateReviewService,
  deleteReviewService,
}
