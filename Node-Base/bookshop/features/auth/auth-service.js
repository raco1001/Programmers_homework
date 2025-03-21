const { findUserByEmail, createUser, storeRefreshToken, getStoredRefreshToken } = require("./auth-repository");
const { hashPassword, verifyPassword, generateTokens} = require("./auth-utils");
const { generatePK } = require("../../shared/utils/generatePK");
const { binaryToUUID, uuidToBinary } = require("../../shared/utils/uuidToBinary");
const uuidUtil = require("../../shared/utils/uuidToBinary");

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
    const userId = uuidUtil.binaryToUUID(user.id);
    const userName = user.name;
    const { accessToken, refreshToken } = generateTokens(user);

    await storeRefreshToken(user.id, refreshToken);

    return { userId, userName,  accessToken, refreshToken };
};


const refreshToken = async (userId, userRefreshToken) => {
    if (!userRefreshToken) throw new Error("Refresh Token이 없습니다.");

    const userBId = uuidToBinary(userId);
    const refreshAuthResult= await getStoredRefreshToken(userBId);
    const email = refreshAuthResult.email;
    const storedToken = refreshAuthResult.refresh_token;
    const name = refreshAuthResult.name;
        

    if (!storedToken || storedToken !== userRefreshToken) {
        throw new Error("유효하지 않은 Refresh Token입니다. 다시 로그인 해주세요!");
    }

    return generateAccessToken({ id: userId, email, name});
};

module.exports = { registerUser, authenticateUser, refreshToken };
