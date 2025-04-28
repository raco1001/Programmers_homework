const {
  insertOrder,
  insertOrderItems,
  findOrderItemsByUser,
  findAddress,
  insertAddress,
  deleteCartItems,
} = require('./order-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')
const { generateUUID } = require('../../shared/utils/generateUUID')
const db = require('../../database/mariadb')

const createOrder = async (
  userId,
  items,
  delivery,
  totalPrice,
  totalQuantity,
  firstBookTitle,
) => {
  const priceSum = items.reduce((acc, item) => acc + item.priceSum, 0)
  if (priceSum !== totalPrice) {
    throw new Error('결제 금액이 일치하지 않습니다.')
  }

  const userBid = uuidToBinary(userId)

  const orderBid = uuidToBinary(generateUUID())

  const conn = await db.getConnection()
  await conn.beginTransaction()

  try {
    const addressBid = uuidToBinary(generateUUID())
    const address = await insertAddress(conn, userBid, addressBid, delivery)
    if (address === 1) {
      throw new Error('주소 생성 실패')
    }

    const createdOrderResult = await insertOrder(
      conn,
      orderBid,
      userBid,
      addressBid,
      totalPrice,
      totalQuantity,
      firstBookTitle,
    )

    if (createdOrderResult !== 1) {
      throw new Error('주문 생성 실패')
    }

    const modifiedItems = items.map((item) => ({
      ...item,
      orderItemBid: uuidToBinary(generateUUID()),
      productBid: uuidToBinary(item.productId),
      orderBid,
      userBid,
    }))

    const createdOrderItemsResult = await insertOrderItems(
      conn,
      userBid,
      orderBid,
      modifiedItems,
    )

    await deleteCartItems(conn, userBid, modifiedItems)
    await conn.commit()

    return binaryToUUID(orderBid)
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

const getOrderItemsByUser = async (userId, pageSize, pageNumber) => {
  const userBid = uuidToBinary(userId)
  return await findOrderItemsByUser(userBid, pageSize, pageNumber)
}

module.exports = {
  getOrderItemsByUser,
  createOrder,
}
