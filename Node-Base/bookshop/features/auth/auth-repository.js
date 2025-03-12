const db = require("../../app/database/mariadb");

exports.findUserByEmail = async (email) => {
    try {
        const result = await db.query(
            "SELECT id, name, email, password, salt FROM users WHERE email = ?",
            [email]
        );
        return result[0];
    } catch (error) {
        throw error;
    }
};

exports.createUser = async (name, email, password, salt) => {
    try {
        const result = await db.query(
            "INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)",
            [name, email, password, salt]
        );
        return { id: result.insertId, name, email };
    } catch (error) {
        throw error;
    }
};
