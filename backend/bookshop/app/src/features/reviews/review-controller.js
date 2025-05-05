const {
  createReviewService,
  getReviewsService,
  updateReviewService,
  deleteReviewService,
} = require('./review-service')

const createReview = async (req, res, next) => {
  const { userId } = req.userId
  console.log('userId from controller', userId)
  const { productId, rating, review } = req.body
  const createdReview = await createReviewService(
    userId,
    productId,
    rating,
    review,
  )
  res.status(201).json(createdReview)
}

const getReviews = async (req, res, next) => {
  const { productId } = req.params
  const { limit, page, sortBy, sortOrder } = req.query
  const reviews = await getReviewsService(
    productId,
    limit,
    page,
    sortBy,
    sortOrder,
  )
  res.status(200).json(reviews)
}

const updateReview = async (req, res, next) => {
  const { userId } = req.userId
  const { productId, rating, review } = req.body
  const updatedReview = await updateReviewService(
    userId,
    productId,
    rating,
    review,
  )
  res.status(200).json(updatedReview)
}

const deleteReview = async (req, res, next) => {
  const { userId } = req.userId
  const { productId } = req.params
  const deletedReview = await deleteReviewService(userId, productId)
  res.status(200).json(deletedReview)
}

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
}
