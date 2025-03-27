const db = require('../../app/database/mariadb')

const insertPaymentProvider = async (id, paymentName, paymentType) => {
  const query = `
      INSERT INTO payment_providers (id, name, type)
      VALUES (?, ?, ?)
  `
  const [result] = await db.query(query, [id, paymentName, paymentType])
  return result.id
}

const insertInternalPayment = async (paymentInfo) => {
  const { id, user_id, provider_id, method, transaction_id, amount, receipt } =
    paymentInfo
  console.log(paymentInfo)
  console.log(id, user_id, provider_id, method, transaction_id, amount, receipt)
  const query = `
        INSERT INTO payments (id, user_id, provider_id, method, transaction_id, amount, receipt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  await db.query(query, [
    id,
    user_id,
    provider_id,
    method,
    transaction_id,
    amount,
    receipt,
  ])
  console.log('첫번째 쿼리 통과')
  return id
}

const insertPGPayment = async (paymentInfo) => {
  const {
    paymentBid,
    userBid,
    providerBid,
    paymentMethod,
    transactionId,
    amount,
    receipt,
  } = paymentInfo
  const query = `
        INSERT INTO payments (id, user_id, provider_id, method, transaction_id, amount, receipt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  await db.query(query, [
    paymentBid,
    userBid,
    providerBid,
    paymentMethod,
    transactionId,
    amount,
    receipt,
  ])
  return id
}

module.exports = {
  insertPaymentProvider,
  insertInternalPayment,
  insertPGPayment,
}
