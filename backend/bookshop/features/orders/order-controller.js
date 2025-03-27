const OrderService = require('./order-service');


// const createOrder = async (req, res, next) => {
//     try {
//         const { userId, selectedCartItems, addressId, paymentInfo } = req.body;
//         const orderId = await OrderService.createOrder(userId, selectedCartItems, addressId, paymentInfo);

//         res.status(201).json({ status: 'success', orderId, message: '주문 생성 완료' });
//     } catch (err) {
//         next(err);
//     }
// };


const updateOrderItem = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;
        await OrderService.modifyOrderItem(userId, productId, quantity);
        res.status(200).json({ status: 'success', message: '장바구니 상품 수량 업데이트 완료' });
    } catch (err) {
        next(err);
    }
};


const getOrderItems = async (req, res, next) => {
    try {
        console.log( req.query);
        const userId = req.query.userId;
        const pageSize = Number(req.query.pageSize);
        const pageNumber  = Number(req.query.pageNumber);
        console.log(userId, pageSize, pageNumber);
        const items = await OrderService.getOrderItemsByUser(userId, pageSize, pageNumber);
        res.status(200).json({ status: 'success', data: items });
    } catch (err) {
        next(err);
    }
};

module.exports = { getOrderItems, updateOrderItem };
