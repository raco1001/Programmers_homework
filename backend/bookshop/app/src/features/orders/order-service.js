const {
  insertOrder,
  insertOrderItems,
  findOrdersByUser,
  findOrderItemsByOrderId,
  insertAddress,
  deleteCartItems,
} = require('./order-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')
const { generateUUID } = require('../../shared/utils/generateUUID')
const { getStatus } = require('../../shared/utils/getStatus')
const db = require('../../database/mariadb')

const createOrder = async (
  userId,
  items,
  delivery,
  totalPrice,
  totalQuantity,
  firstProductId,
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
      firstProductId,
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

    if (createdOrderItemsResult !== modifiedItems.length) {
      throw new Error('주문 아이템 생성 실패')
    }

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

const getOrdersByUser = async (userId, pageSize, pageNumber) => {
  const userBid = uuidToBinary(userId)
  const orders = await findOrdersByUser(userBid, pageSize, pageNumber)
  pageSize = pageSize ? pageSize : 10
  pageNumber = pageNumber ? pageNumber : 1

  if (orders.length > 0) {
    orders.forEach(async (order) => {
      order.orderId = binaryToUUID(order.orderId)
      order.status = getStatus(order.status)
    })
  }
  console.log(orders)
  return orders
}

const getOrderItemsByOrderId = async (userId, orderId) => {
  const userBid = uuidToBinary(userId)
  const orderBid = uuidToBinary(orderId)

  const orderItems = await findOrderItemsByOrderId(orderBid)

  if (orderItems.length > 0) {
    orderItems.forEach(async (orderItem) => {
      orderItem.orderItemId = binaryToUUID(orderItem.orderItemId)
      orderItem.productId = binaryToUUID(orderItem.productId)
    })
  }

  return orderItems
}

module.exports = {
  getOrdersByUser,
  createOrder,
  getOrderItemsByOrderId,
}
