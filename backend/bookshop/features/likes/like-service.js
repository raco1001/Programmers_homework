const { findLikes, insertLike, deleteLike } = require('./like-repository')

getLike = async (userId, bookId) => {
  const likeUser = await findLikes(userId, bookId)

  if (likeUser) {
    return 1
  } else {
    return 0
  }
}

createLike = async (userId, bookId) => {
  const result = await insertLike(userId, bookId)

  return result
}

deleteLikeIfExists = async (userId) => {
  const exists = await findLikes(userId, bookId)
  if (exists) {
    return 0
  }

  const result = await deleteLike(userId, bookId)

  return result
}

module.exports = {
  getLike,
  createLike,
  deleteLikeIfExists,
}
