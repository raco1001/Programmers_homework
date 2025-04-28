const {
  findLikes,
  insertLike,
  deleteLike,
  updateLike,
} = require('./like-repository')
const {
  uuidToBinary,
  binaryToUUID,
} = require('./../../shared/utils/convertIds')
getLike = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const likeUser = await findLikes(userBid, productBid)

  if (likeUser) {
    return 1
  } else {
    return 0
  }
}

createLike = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const createdResult = await insertLike(userBid, productBid)
  if (createdResult === 0) {
    return 0
  }
  const updatedResult = await updateLike(productBid, 1)
  if (updatedResult === 0) {
    return 0
  }
  return 1
}

deleteLikeIfExists = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const exists = await findLikes(userBid, productBid)
  if (!exists) {
    return 0
  }

  const result = await deleteLike(userBid, productBid)
  if (result === 0) {
    return 0
  }
  const updatedResult = await updateLike(productBid, -1)
  if (updatedResult === 0) {
    return 0
  }
  return 1
}

module.exports = {
  getLike,
  createLike,
  deleteLikeIfExists,
}
