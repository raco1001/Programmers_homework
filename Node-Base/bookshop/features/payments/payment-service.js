const db = require('../../app/database/mariadb')
const {
  insertPaymentProvider,
  insertInternalPayment,
  insertPGPayment,
} = require('./payment-repository')
const { generatePK } = require('../../shared/utils/generateUUID')
const { uuidToBinary } = require('../../shared/utils/convertIds')
const { generateTransactionId } = require('./utils/generate-transaction-id')
const { insertOrder, insertOrderItems } = require('../orders/order-repository')
const { deleteCartItems } = require('../carts/cart-repository')

const createPaymentProvider = (providerName, providerType) => {
  const id = generatePK().binaryId
  console.log(id)
  const insertPaymentProviderResult = insertPaymentProvider(
    id,
    providerName,
    providerType,
  )

  if (!insertPaymentProviderResult) {
    return false
  }

  return true
}

const processPayment = async (paymentInfos) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()

    const { userId, providerId, addressId, paymentMethod, paymentType, data } =
      paymentInfos
    const paymentBid = generatePK().binaryId
    const userBid = uuidToBinary(userId)
    const providerBid = uuidToBinary(providerId)
    const addressBid = uuidToBinary(addressId)

    const amount = data.reduce((acc, val) => acc + val.price * val.count, 0)
    const transactionId = generateTransactionId()
    const receipt = 'receipt'

    const paymentInfo = {
      id: paymentBid,
      user_id: userBid,
      provider_id: providerBid,
      method: paymentMethod,
      transaction_id: transactionId,
      amount: amount,
      receipt: receipt,
    }
    console.log(paymentInfo)
    if (paymentType === 'internal') {
      await insertInternalPayment(paymentInfo)
    } else if (paymentType === 'pg') {
      await insertPGPayment(paymentInfo)
    } else {
      throw new Error('지원하지 않는 결제 방식입니다.')
    }

    const orderBid = generatePK().binaryId
    const orderInfo = { orderBid, paymentBid, addressBid, amount }
    await insertOrder(orderInfo)
    console.log(
      `insertOrder완료==============================================================================================`,
    )

    const orderItemInfo = data.map((val) => ({
      orderItemBid: generatePK().binaryId,
      orderBid,
      productBid: uuidToBinary(val.productId),
      price: val.price,
      count: val.count,
      totalPrice: val.price * val.count,
    }))

    await insertOrderItems(orderItemInfo)
    const cartItemBids = data.map((val) => uuidToBinary(val.cartId))

    await deleteCartItems(cartItemBids)

    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

module.exports = { createPaymentProvider, processPayment }
