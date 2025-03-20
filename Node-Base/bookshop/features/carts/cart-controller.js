const cartService = require('./cart-service');

const addToCart = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(userId, productId, quantity);
        await cartService.addCartItem(userId, productId, quantity);
        res.status(201).json({ status: 'success', message: '장바구니에 상품 추가 완료' });
    } catch (err) {
        next(err);
    }
};

const updateCartItem = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;
        await cartService.modifyCartItem(userId, productId, quantity);
        res.status(200).json({ status: 'success', message: '장바구니 상품 수량 업데이트 완료' });
    } catch (err) {
        next(err);
    }
};


const deleteFromCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;
        await cartService.removeCartItem(userId, productId);
        res.status(200).json({ status: 'success', message: '장바구니에서 상품 제거 완료' });
    } catch (err) {
        next(err);
    }
};


const getCartItems = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const items = await cartService.getCartItemsByUser(userId);
        res.status(200).json({ status: 'success', data: items });
    } catch (err) {
        next(err);
    }
};

module.exports = { addToCart, deleteFromCart, getCartItems, updateCartItem };
