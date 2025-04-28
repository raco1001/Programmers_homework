const db = require('../../database/mariadb')

const findLikes = async (userId, productId) => {
  const [rows] = await db.query(
    'SELECT user_id FROM user_likes WHERE user_id = ? AND product_id = ?',
    [userId, productId],
  )
  return rows.length ? rows[0] : null
}

const insertLike = async (userId, productId) => {
  console.log('query starts')
  const [result] = await db.query(
    'INSERT user_likes (product_id, user_id) VALUES (?, ?)',
    [productId, userId],
  )

  return result.affectedRows
}

const updateLike = async (productId, amount) => {
  const targetValue = amount > 0 ? 'likes + 1' : 'likes - 1'
  const [result] = await db.query(
    `UPDATE products SET likes = ${targetValue} WHERE id = ?`,
    [productId],
  )
  console.log('updateLike', result.affectedRows)
  return result.affectedRows
}

const deleteLike = async (userId, productId) => {
  const [result] = await db.query(
    'DELETE FROM user_likes WHERE user_id = ? AND product_id = ?',
    [userId, productId],
  )
  return result.affectedRows
}

module.exports = { findLikes, insertLike, deleteLike, updateLike }
