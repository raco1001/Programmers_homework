const cartRepo = require('./cart-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

const addCartItem = async (userId, productId, quantity) => {
  console.log('UUID 변형 시작')
  const uid = uuidToBinary(userId)
  console.log(uid)
  const pid = uuidToBinary(productId)
  return await cartRepo.insertCartItem(uid, pid, quantity)
}

const modifyCartItem = async (userId, productId) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)
  return await cartRepo.updateCartItem(uid, pid)
}

const removeCartItem = async (userId, productId) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)

  return await cartRepo.deleteCartItem(uid, pid)
}

const getCartItemsByUser = async (userId) => {
  const uid = uuidToBinary(userId)
  const cartItems = await cartRepo.findCartItemsByUser(uid)
  const transformed = cartItems.map((item) => ({
    ...item,
    userId: binaryToUUID(item.userId),
    bookId: binaryToUUID(item.bookId),
  }))
  return transformed
}

module.exports = {
  addCartItem,
  removeCartItem,
  getCartItemsByUser,
  modifyCartItem,
}
