const { createNewCart, findCartById, modifyCart, removeCart } = require('../services/cartService');

exports.createCart = async (req, res, next) => {
    try {
        const { user_id, Cart_title, description } = req.body;
        const newCart = await createNewCart(user_id, Cart_title, description);
        res.status(201).json({ status: 'success', message: '채널이 생성되었습니다!', data: newCart });
    } catch (error) {
        next(error);
    }
};

exports.getCartById = async (req, res, next) => {
    try {
        const Cart = await findCartById(req.params.id);
        if (!Cart) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
        }
        res.json({ status: 'success', data: Cart });
    } catch (error) {
        next(error);
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedCart = await modifyCart(id, req.body);
        if (!updatedCart) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
        }
        res.json({ status: 'success', message: '채널 정보가 업데이트되었습니다.', data: updatedCart });
    } catch (error) {
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const deleted = await removeCart(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: 'error', message: '해당 채널이 존재하지 않습니다.' });
        }
        res.json({ status: 'success', message: '채널이 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
};
