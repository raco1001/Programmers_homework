const { insertCart, getCart, updateCart, deleteCart } = require('../repositories/cartRepository');

exports.createNewCart = async (userId, title, description) => {
    return await insertCart(userId, title, description);
};

exports.findCartById = async (CartId) => {
    return await getCart(CartId);
};

exports.modifyCart = async (CartId, CartData) => {
    return await updateCart(CartId, CartData);
};

exports.removeCart = async (CartId) => {
    return await deleteCart(CartId);
};
