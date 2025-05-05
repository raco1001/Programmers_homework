const db = require('../../database/mariadb')

const createReview = async (review) => {
  const { id, user_id, product_id, rating, comment } = review
  const query = `
    INSERT INTO reviews (id, user_id, product_id, rating, review)
    VALUES (?, ?, ?, ?, ?)
  `
  const [result] = await db.query(query, [
    id,
    user_id,
    product_id,
    rating,
    comment,
  ])
  return result.id
}

const getReviews = async (productId, limit, page, sortBy, sortOrder) => {
  const offset = (page - 1) * limit
  const sortByField = ReviewSchema.getSortBy()[sortBy]
  const sortOrderField = ReviewSchema.getSortOrder()[sortOrder]
  const query = ` 
    SELECT * FROM reviews WHERE product_id = ?
    ORDER BY ${sortByField} ${sortOrderField}
    LIMIT ${limit} OFFSET ${offset}
  `
  const [result] = await db.query(query, [productId])
  return result
}

const updateReview = async (review) => {
  const { user_id, product_id, rating, comment } = review
  const query = `
    UPDATE reviews SET rating = ?, review = ? WHERE user_id = ? AND product_id = ?
  `
  const [result] = await db.query(query, [rating, comment, user_id, product_id])
  return result.id
}

const deleteReview = async (user_id, product_id) => {
  const query = `
    DELETE FROM reviews WHERE user_id = ? AND product_id = ?
  `
  const [result] = await db.query(query, [user_id, product_id])
  return result.id
}
module.exports = { createReview, getReviews, updateReview, deleteReview }
