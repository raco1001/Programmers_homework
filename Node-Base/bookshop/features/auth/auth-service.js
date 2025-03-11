const { findUserByEmail, createUser } = require("./repository");
const {  hashPassword, verifyPassword, generateTokens, generateRefreshToken } = require("./auth-utils");


const registerUser = async (name, email, password) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("이미 가입된 이메일입니다.");
    }

    const { salt, hashedPassword } = hashPassword(password);

    return createUser(name, email, hashedPassword, salt);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user || !verifyPassword(password, user.salt, user.password)) {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    return  generateTokens(user);
};

const refreshToken = async (decodedToken) => {
    if (!refreshToken) throw new Error("Refresh Token이 없습니다.");

    return generateRefreshToken({ id: decodedToken.id });
};


module.exports = { registerUser , authenticateUser, refreshToken };