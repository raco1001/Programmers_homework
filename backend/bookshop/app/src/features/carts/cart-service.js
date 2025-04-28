const {
  findCartItemsByUser,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
  increaseCartItem,
  validateCartItem,
} = require('./cart-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

const getCartItemsByUserId = async (userId) => {
  const userBid = uuidToBinary(userId)
  const cartItems = await findCartItemsByUser(userBid)
  if (cartItems.length === 0) {
    return []
  } else {
    const transformed = cartItems.map((item) => ({
      ...item,
      productId: binaryToUUID(item.productId),
    }))
    return transformed
  }
}

const addCartItem = async (userId, productId, quantity) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const cartItem = await validateCartItem(userBid, productBid)
  if (cartItem) {
    return await increaseCartItem(userBid, productBid, quantity)
  }
  return await insertCartItem(userBid, productBid, quantity)
}

const modifyCartItem = async (userId, productId, quantity) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  return await updateCartItem(userBid, productBid, quantity)
}

const removeCartItem = async (userId, productId) => {
  console.log('removeCartItem++++++++++++++', userId, productId)
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)

  return await deleteCartItem(userBid, productBid)
}

module.exports = {
  addCartItem,
  removeCartItem,
  getCartItemsByUserId,
  modifyCartItem,
}
