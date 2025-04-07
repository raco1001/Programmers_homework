const orderRepo = require('./order-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

// const createOrder = (userId, cartItems, addressId, paymentInfo) => {
//     const uid = toBinaryUUID(userId);
//     let conn;
//     let paymentId, orderId;

//     return db.getConnection()
//         .then(connection => {
//             conn = connection;
//             return conn.beginTransaction();
//         })
//         .then(() => paymentRepo.insertPaymentTx(conn, uid, paymentInfo))
//         .then(result => {
//             paymentId = result;
//             const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//             return orderRepo.insertOrderTx(conn, uid, addressId, paymentId, totalAmount);
//         })
//         .then(result => {
//             orderId = result;
//             const promises = cartItems.map(item =>
//                 orderRepo.insertOrderItemTx(conn, orderId, uid, item.productId, item.quantity, item.totalPrice, item.deliveryId)
//             );
//             return Promise.all(promises);
//         })
//         .then(() => {
//             const productIds = cartItems.map(item => item.productId);
//             return cartRepo.removeItemsTx(conn, uid, productIds);
//         })
//         .then(() => conn.commit())
//         .then(() => orderId)
//         .catch(err => {
//             return conn.rollback().then(() => { throw err; });
//         })
//         .finally(() => {
//             if (conn) conn.release();
//         });
// };

const modifyOrderItem = async (userId, productId) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)
  return await orderRepo.updateOrderItem(uid, pid)
}

const removeOrderItem = async (userId, productId) => {
  const uid = uuidToBinary(userId)
  const pid = uuidToBinary(productId)
  return await orderRepo.deleteOrderItem(uid, pid)
}

const getOrderItemsByUser = async (userId, pageSize, pageNumber) => {
  const uid = uuidToBinary(userId)
  return await orderRepo.findOrderItemsByUser(uid, pageSize, pageNumber)
}

module.exports = { removeOrderItem, getOrderItemsByUser, modifyOrderItem }
