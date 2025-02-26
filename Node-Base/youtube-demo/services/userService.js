const { findUserById, deleteUserById } = require('../repositories/userRepository');

exports.getUser = async (userId) => {
    return await findUserById(userId);
};

exports.removeUser = async (userId) => {
    return await deleteUserById(userId);
};
