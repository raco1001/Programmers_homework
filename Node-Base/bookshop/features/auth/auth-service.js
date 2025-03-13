const { findUserByEmail, createUser } = require("./auth-repository");
const { hashPassword, verifyPassword, generateTokens, generateRefreshToken } = require("./auth-utils");
const { generatePK } = require("../../shared/utils/generatePK");


const registerUser = async (name, email, password) => {

    const existingUser = await findUserByEmail(email);

    if (existingUser !== null) {
        throw new Error("이미 가입된 이메일입니다.");
    }

    const { salt, hashedPassword } = hashPassword(password);

    const { binaryId } = generatePK();

    const affectedRows = await createUser(binaryId, name, email, hashedPassword, salt);

    if(affectedRows !== 1){
        throw new Error("이미 가입된 이메일입니다.");
    }
    
    return affectedRows;
};


const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user || !verifyPassword(password, user.salt, user.password)) {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }


    const { accessToken, refreshToken } = generateTokens(user);

    await storeRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
};


const refreshToken = async (refreshToken) => {
    if (!refreshToken) throw new Error("Refresh Token이 없습니다.");

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const storedToken = await getStoredRefreshToken(decoded.id);
    
    if (!storedToken || storedToken !== refreshToken) {
        throw new Error("유효하지 않은 Refresh Token입니다.");
    }

    return generateAccessToken({ id: decoded.id });
};

module.exports = { registerUser, authenticateUser, refreshToken };
