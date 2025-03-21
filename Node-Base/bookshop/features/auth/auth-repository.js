const db = require("../../app/database/mariadb");

exports.findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query( 
            "SELECT id, name, email, password, salt FROM users WHERE email = ?",
            [email]
        );

        if (!rows || rows.length === 0) {
            return null; 
        }

        if (rows.length > 1) {
            throw new Error(`데이터베이스에 중복된 이메일이 존재합니다: ${email}`);
        }

        return rows[0]; 
    } catch (error) {
        console.error(`[findUserByEmail] 오류 발생: ${error.message}`);
        throw error;
    }
};

exports.createUser = async (id, name, email, password, salt) => {
    try {
        console.log(`유저 생성 중: ${id}, ${name}, ${email}, ${password}, ${salt}`);
        const result = await db.query(
            "INSERT INTO users (id, name, email, password, salt) VALUES (?, ?, ?, ?, ?)",
            [id, name, email, password, salt]
        );
        const affectedRows = result[0].affectedRows
        console.log(`${affectedRows}`);
        return affectedRows;
    } catch (error) {
        throw error;
    }
};

exports.storeRefreshToken = async (userId, refreshToken) => {
    try {
        await db.query(
            "UPDATE users SET refresh_token = ? WHERE id = ?",
            [refreshToken, userId]
        );
    } catch (error) {
        throw error;
    }
};

exports.getStoredRefreshToken = async (userId) => {
    try {
        const [rows] = await db.query(
            "SELECT email, name, refresh_token FROM users WHERE id = ?",
            [userId]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};

exports.deleteRefreshToken = async (userId) => {
    try {
        await db.query(
            "UPDATE users SET refresh_token = NULL WHERE id = ?",
            [userId]
        );
    } catch (error) {
        throw error;
    }
};