const initiate = async (userId, paymentInfo) => {
  const pgParams = generatePGParams(paymentInfo)
  const response = await externalPGAPI.request(pgParams)
  await paymentRepo.insertPGPayment(userId, paymentInfo, response)
  return response
}
module.exports = { initiate }
