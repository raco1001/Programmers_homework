const { findUserById, deleteUserById, updateUserById } = require('./user-repository');
const { hashPassword } = require('../auth/auth-utils');

getUser = async (userId) => {
    return await findUserById(userId);
};


getUserByEmail = async (email) => {
    return await findUserByEmail(email);
};

removeUser = async (userId) => {
    return await deleteUserById(userId);
};

updateUserPassword = async (userId, password) => {
    password = await hashPassword(password);
    return await updateUserById(userId, password);
};

module.exports = {
    getUser,
    getUserByEmail,
    removeUser,
    updateUserPassword
};