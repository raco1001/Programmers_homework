const {
  getOrderItemsByOrderId,
  getOrdersByUser,
  createOrder,
} = require('./order-service')

const initOrder = async (req, res, next) => {
  try {
    const userId = req.userId
    const { items, delivery, totalPrice, totalQuantity, firstProductId } =
      req.body
    const orderId = await createOrder(
      userId,
      items,
      delivery,
      totalPrice,
      totalQuantity,
      firstProductId,
    )
    res
      .status(201)
      .json({ status: 'success', orderId: orderId, message: '주문 생성 완료' })
  } catch (err) {
    next(err)
  }
}

const getOrders = async (req, res, next) => {
  try {
    const userId = req.userId
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const orders = await getOrdersByUser(userId, pageSize, pageNumber)
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
}

const getOrderItems = async (req, res, next) => {
  try {
    const userId = req.userId
    const orderId = req.params.orderId
    const items = await getOrderItemsByOrderId(userId, orderId)
    res.status(200).json(items)
  } catch (err) {
    next(err)
  }
}

module.exports = { initOrder, getOrderItems, getOrders }
