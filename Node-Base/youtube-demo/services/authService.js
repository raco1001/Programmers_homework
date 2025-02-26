const bcrypt = require('bcrypt');
const { findUserByEmail, insertUser } = require('../repositories/authRepository');

exports.authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }
    return user;
};

exports.createUser = async (id, name, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await insertUser(id, name, email, hashedPassword, role);
};
