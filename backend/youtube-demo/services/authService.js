const bcrypt = require('bcrypt');
const { findUserByEmail, insertUser } = require('../repositories/authRepository');

exports.authenticateUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        
        console.log(user);
        if (!user) {
            console.log(`❌ 사용자를 찾을 수 없습니다: ${email}`);
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        console.log(`✅ bcrypt 비교 결과:`, isMatch);

        if (!isMatch) {
            console.log(`❌ 비밀번호 불일치: ${email}`);
            return null;
        }

        console.log(`✅ 인증 성공:`, user);
        return user;
    } catch (error) {
        console.error("❌ 인증 중 오류 발생:", error);
        throw error;
    }
};

exports.createUser = async ( name, email, password ) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`✅ 비밀번호 해싱 완료: ${hashedPassword}`);
        return await insertUser(name, email, hashedPassword);
    } catch (error) {
        console.error("❌ 사용자 생성 중 오류 발생:", error);
        throw error;
    }
};
