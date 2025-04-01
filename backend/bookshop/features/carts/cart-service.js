const {
  findCartItemsByUser,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
} = require('./cart-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

const getCartItemsByUserId = async (userId) => {
  const uid = uuidToBinary(userId)
  const cartItems = await findCartItemsByUser(uid)
  const transformed = cartItems.map((item) => ({
    ...item,
    userId: binaryToUUID(item.userId),
    bookId: binaryToUUID(item.bookId),
  }))
  return transformed
}

const addCartItem = async (userId, productId, count) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)
  return await insertCartItem(uid, pid, count)
}

const modifyCartItem = async (userId, productId) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)
  return await updateCartItem(uid, pid)
}

const removeCartItem = async (userId, productId) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)

  return await deleteCartItem(uid, pid)
}

module.exports = {
  addCartItem,
  removeCartItem,
  getCartItemsByUserId,
  modifyCartItem,
}
