const cartRepo = require('./cart-repository');
const { toBinaryUUID } = require('./cart-utils'); 

const addCartItem = async (userId, productId, quantity) => {
    const uid = toBinaryUUID(userId);
    const pid = toBinaryUUID(productId);
    return await cartRepo.insertCartItem(uid, pid, quantity);
};

const modifyCartItem = async (userId, productId) => {
   const uid = toBinaryUUID(userId);
   const pid = toBinaryUUID(productId);
   return await cartRepo.updateCartItem(uid, pid);
};


const removeCartItem = async (userId, productId) => {
    const uid = toBinaryUUID(userId);
    const pid = toBinaryUUID(productId);
    return await cartRepo.deleteCartItem(uid, pid);
};

const getCartItemsByUser = async (userId) => {
    const uid = toBinaryUUID(userId);
    return await cartRepo.findCartItemsByUser(uid);
};

module.exports = { addCartItem, removeCartItem, getCartItemsByUser, modifyCartItem };
